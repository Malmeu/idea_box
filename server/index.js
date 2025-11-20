require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateContent, anonymizeMetadata } = require('./utils/contentModeration');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors());
app.use(express.json());

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('❌ No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('❌ Token verification failed:', err.message);
            return res.status(403).json({ error: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
        }
        // Support both new (userId) and old (id) token payloads
        req.user = {
            ...user,
            userId: user.userId || user.id
        };
        next();
    });
};

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    res.json({ token, role: user.role });
});

// Ideas Routes
app.get('/api/ideas', async (req, res) => {
    // Get userId from token if available (optional auth for viewing, but needed for "hasLiked")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let userId = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.userId;
        } catch (e) { }
    }

    const ideas = await prisma.idea.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            comments: {
                include: { user: { select: { username: true } } },
                orderBy: { createdAt: 'desc' }
            },
            userLikes: true
        }
    });

    const formattedIdeas = ideas.map(idea => ({
        ...idea,
        id: idea.id.toString(),
        commentsCount: idea.comments.length,
        comments: idea.comments.map(c => ({
            ...c,
            id: c.id.toString(),
            username: c.user ? c.user.username : 'Anonyme'
        })),
        hasLiked: userId ? idea.userLikes.some(like => like.userId === userId) : false,
        createdAt: idea.createdAt
    }));
    res.json(formattedIdeas);
});

app.post('/api/ideas', async (req, res) => {
    const { title, description, category, priority, tags, isAdvanced } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Titre et description requis" });

    // Validation du titre
    const titleValidation = validateContent(title, { maxLength: 100, minLength: 3 });
    if (!titleValidation.isValid) {
        return res.status(400).json({ error: titleValidation.message });
    }

    // Validation de la description
    const descriptionValidation = validateContent(description, { maxLength: 500, minLength: 10 });
    if (!descriptionValidation.isValid) {
        return res.status(400).json({ error: descriptionValidation.message });
    }

    const idea = await prisma.idea.create({
        data: { 
            title: titleValidation.cleanedContent, 
            description: descriptionValidation.cleanedContent,
            category: category || null,
            priority: priority || null,
            tags: tags || null,
            isAdvanced: isAdvanced || false
        }
    });
    res.json({ ...idea, id: idea.id.toString(), comments: [], hasLiked: false });
});

app.post('/api/ideas/:id/like', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_ideaId: {
                    userId: userId,
                    ideaId: parseInt(id)
                }
            }
        });

        let updatedIdea;

        if (existingLike) {
            // Unlike
            await prisma.like.delete({ where: { id: existingLike.id } });
            updatedIdea = await prisma.idea.update({
                where: { id: parseInt(id) },
                data: { likes: { decrement: 1 } }
            });
        } else {
            // Like
            await prisma.like.create({
                data: {
                    userId: userId,
                    ideaId: parseInt(id)
                }
            });
            updatedIdea = await prisma.idea.update({
                where: { id: parseInt(id) },
                data: { likes: { increment: 1 } }
            });
        }

        res.json({ ...updatedIdea, hasLiked: !existingLike });
    } catch (e) {
        console.error(e);
        res.status(404).json({ error: "Erreur lors du like" });
    }
});

app.post('/api/ideas/:id/comments', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content) return res.status(400).json({ error: "Contenu requis" });

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                ideaId: parseInt(id),
                userId
            },
            include: { user: { select: { username: true } } }
        });

        res.json({
            ...comment,
            id: comment.id.toString(),
            username: comment.user.username
        });
    } catch (e) {
        res.status(500).json({ error: "Erreur lors du commentaire" });
    }
});

// Messages Routes
app.get('/api/messages', async (req, res) => {
    const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' }
    });
    const formattedMessages = messages.map(msg => ({
        ...msg,
        id: msg.id.toString()
    }));
    res.json(formattedMessages);
});

app.post('/api/messages', async (req, res) => {
    const { content, color, title, category, mood, isAdvanced } = req.body;
    if (!content) return res.status(400).json({ error: "Contenu requis" });

    // Anonymisation des métadonnées (ne stocke aucune info identifiable)
    anonymizeMetadata(req);

    // Validation du contenu principal
    const contentValidation = validateContent(content, { maxLength: 500, minLength: 1 });
    if (!contentValidation.isValid) {
        return res.status(400).json({ error: contentValidation.message });
    }

    // Validation du titre si présent
    let validatedTitle = title;
    if (title) {
        const titleValidation = validateContent(title, { maxLength: 100, minLength: 1 });
        if (!titleValidation.isValid) {
            return res.status(400).json({ error: `Titre: ${titleValidation.message}` });
        }
        validatedTitle = titleValidation.cleanedContent;
    }

    const message = await prisma.message.create({
        data: {
            content: contentValidation.cleanedContent,
            color: color || 'bg-pastel-blue/40',
            title: validatedTitle || null,
            category: category || null,
            mood: mood || null,
            isAdvanced: isAdvanced || false
        }
    });
    
    // Ne retourner que les données nécessaires, sans métadonnées
    res.json({ 
        id: message.id.toString(),
        content: message.content,
        color: message.color,
        title: message.title,
        category: message.category,
        mood: message.mood,
        isAdvanced: message.isAdvanced,
        createdAt: message.createdAt
    });
});

// Admin Routes (Protected)
app.delete('/api/ideas/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.comment.deleteMany({ where: { ideaId: parseInt(id) } }); // Delete related comments first
        await prisma.idea.delete({ where: { id: parseInt(id) } });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
});

app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.message.delete({ where: { id: parseInt(id) } });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
