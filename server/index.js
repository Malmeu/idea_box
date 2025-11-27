require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { supabase } = require('./supabase');
const { validateContent, anonymizeMetadata } = require('./utils/contentModeration');

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

    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: user.role });
});

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password: hashedPassword, role: 'USER' }])
        .select()
        .single();

    if (error) {
        return res.status(400).json({ error: "Nom d'utilisateur déjà pris" });
    }

    const token = jwt.sign({ userId: data.id, role: data.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: data.role });
});

// Ideas Routes
app.get('/api/ideas', authenticateToken, async (req, res) => {
    const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/ideas', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!validateContent(title) || !validateContent(description)) {
        return res.status(400).json({ error: "Contenu inapproprié détecté" });
    }

    const { data, error } = await supabase
        .from('ideas')
        .insert([{ title, description, user_id: userId, likes: 0 }])
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/ideas/:id/like', authenticateToken, async (req, res) => {
    const { id } = req.params;

    const { data: idea, error: fetchError } = await supabase
        .from('ideas')
        .select('likes')
        .eq('id', id)
        .single();

    if (fetchError) return res.status(500).json({ error: fetchError.message });

    const { data, error } = await supabase
        .from('ideas')
        .update({ likes: idea.likes + 1 })
        .eq('id', id)
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.delete('/api/ideas/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: "Accès refusé" });
    }

    const { id } = req.params;
    const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Idée supprimée' });
});

// Messages Routes
app.get('/api/messages', authenticateToken, async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: "Accès refusé" });
    }

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/messages', async (req, res) => {
    const { content, color, title, category, mood, isAdvanced } = req.body;

    if (!validateContent(content)) {
        return res.status(400).json({ error: "Contenu inapproprié détecté" });
    }

    const metadata = anonymizeMetadata({ title, category, mood });

    const { data, error } = await supabase
        .from('messages')
        .insert([{
            content,
            color,
            title: metadata.title,
            category: metadata.category,
            mood: metadata.mood,
            is_advanced: isAdvanced || false
        }])
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: "Accès refusé" });
    }

    const { id } = req.params;
    const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Message supprimé' });
});

// Emergency Routes
app.get('/api/emergencies', authenticateToken, async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: "Accès refusé" });
    }

    const { data, error } = await supabase
        .from('emergencies')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/emergencies', async (req, res) => {
    const { description, name, department, urgencyLevel, contactAgreement } = req.body;

    if (!description || !name || !department || !urgencyLevel) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const { data, error } = await supabase
        .from('emergencies')
        .insert([{
            description,
            name,
            department,
            urgency_level: urgencyLevel,
            contact_agreement: contactAgreement || false,
            status: 'PENDING'
        }])
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.patch('/api/emergencies/:id/status', authenticateToken, async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: "Accès refusé" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'IN_PROGRESS', 'RESOLVED'].includes(status)) {
        return res.status(400).json({ error: "Statut invalide" });
    }

    const { data, error } = await supabase
        .from('emergencies')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// About U Routes
app.get('/api/about-u', authenticateToken, async (req, res) => {
    const { data, error } = await supabase
        .from('about_u')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/about-u', authenticateToken, async (req, res) => {
    const { content, type, nickname } = req.body;
    const userId = req.user.userId;

    if (!content || !type || !nickname) {
        return res.status(400).json({ error: "Contenu, type et pseudo requis" });
    }

    const isSurpriseUnlocked = content.length > 50;

    const { data, error } = await supabase
        .from('about_u')
        .insert([{
            content,
            type,
            nickname,
            user_id: userId,
            is_surprise_unlocked: isSurpriseUnlocked
        }])
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
