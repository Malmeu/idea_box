const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
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
    const ideas = await prisma.idea.findMany({
        orderBy: { createdAt: 'desc' },
        include: { comments: true } // Include comments count logic if needed, or just raw
    });
    // Transform to match frontend expected format if needed
    const formattedIdeas = ideas.map(idea => ({
        ...idea,
        id: idea.id.toString(),
        comments: idea.comments.length,
        createdAt: idea.createdAt
    }));
    res.json(formattedIdeas);
});

app.post('/api/ideas', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Titre et description requis" });

    const idea = await prisma.idea.create({
        data: { title, description }
    });
    res.json({ ...idea, id: idea.id.toString(), comments: 0 });
});

app.post('/api/ideas/:id/like', async (req, res) => {
    const { id } = req.params;
    try {
        const idea = await prisma.idea.update({
            where: { id: parseInt(id) },
            data: { likes: { increment: 1 } }
        });
        res.json(idea);
    } catch (e) {
        res.status(404).json({ error: "Idée non trouvée" });
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
    const { content, color } = req.body;
    if (!content) return res.status(400).json({ error: "Contenu requis" });

    const message = await prisma.message.create({
        data: {
            content,
            color: color || 'bg-pastel-blue/40'
        }
    });
    res.json({ ...message, id: message.id.toString() });
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
