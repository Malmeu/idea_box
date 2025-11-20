import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface Idea {
    id: string;
    title: string;
    description: string;
    likes: number;
    createdAt: string;
}

interface Message {
    id: string;
    content: string;
    color: string;
    createdAt: string;
}

export const DashboardPage: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const [ideasRes, messagesRes] = await Promise.all([
                fetch('http://localhost:3000/api/ideas'),
                fetch('http://localhost:3000/api/messages')
            ]);
            setIdeas(await ideasRes.json());
            setMessages(await messagesRes.json());
        } catch (error) {
            console.error('Erreur chargement données', error);
        }
    };

    const handleDelete = async (type: 'ideas' | 'messages', id: string) => {
        const token = localStorage.getItem('token');
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

        try {
            const res = await fetch(`http://localhost:3000/api/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                if (type === 'ideas') {
                    setIdeas(ideas.filter(i => i.id !== id));
                } else {
                    setMessages(messages.filter(m => m.id !== id));
                }
            }
        } catch (error) {
            console.error('Erreur suppression', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Dashboard Admin</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section Idées */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="bg-pastel-blue/20 p-2 rounded-lg text-pastel-blue">💡</span>
                        Idées ({ideas.length})
                    </h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {ideas.map(idea => (
                            <div key={idea.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:shadow-md transition-all">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-semibold text-slate-800">{idea.title}</h3>
                                        <p className="text-sm text-slate-600 mt-1">{idea.description}</p>
                                        <div className="flex gap-4 mt-2 text-xs text-slate-400">
                                            <span>❤️ {idea.likes}</span>
                                            <span>📅 {new Date(idea.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete('ideas', idea.id)}
                                        className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Section Messages */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="bg-pastel-lavender/20 p-2 rounded-lg text-pastel-lavender">🛡️</span>
                        Messages ({messages.length})
                    </h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {messages.map(message => (
                            <div key={message.id} className={`p-4 rounded-xl border border-transparent ${message.color} group hover:shadow-md transition-all`}>
                                <div className="flex justify-between items-start gap-4">
                                    <p className="text-slate-700 font-medium font-handwriting">{message.content}</p>
                                    <button
                                        onClick={() => handleDelete('messages', message.id)}
                                        className="text-slate-500/50 hover:text-red-500 p-2 hover:bg-white/50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-2 text-xs text-slate-500/60 text-right">
                                    {new Date(message.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
