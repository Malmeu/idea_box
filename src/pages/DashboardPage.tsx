import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, LogOut, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate, formatDateTime } from '../utils/formatDate';

interface Idea {
    id: string;
    title: string;
    description: string;
    likes: number;
    createdAt?: string;
    created_at?: string;
}

interface Emergency {
    id: string;
    description: string;
    name: string;
    department: string;
    urgencyLevel?: 'MEDIUM' | 'HIGH' | 'CRITICAL';
    urgency_level?: 'MEDIUM' | 'HIGH' | 'CRITICAL';
    contactAgreement?: boolean;
    contact_agreement?: boolean;
    status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
    createdAt?: string;
    created_at?: string;
}

interface Message {
    id: string;
    content: string;
    color: string;
    createdAt?: string;
    created_at?: string;
}

export const DashboardPage: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [emergencies, setEmergencies] = useState<Emergency[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchStats();
    }, [navigate]);

    const fetchStats = async () => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const responses = await Promise.all([
                fetch(`${apiUrl}/api/ideas`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${apiUrl}/api/messages`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${apiUrl}/api/emergencies`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            // Vérifier si une des requêtes a échoué à cause du token
            for (const response of responses) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    navigate('/login');
                    return;
                }
            }

            const [ideasRes, messagesRes, emergenciesRes] = responses;

            if (ideasRes.ok) setIdeas(await ideasRes.json());
            if (messagesRes.ok) setMessages(await messagesRes.json());
            if (emergenciesRes.ok) setEmergencies(await emergenciesRes.json());

        } catch (error) {
            console.error('Erreur chargement stats', error);
        }
    };

    const handleDeleteIdea = async (id: string) => {
        if (!confirm('Supprimer cette idée ?')) return;
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/ideas/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 403 || response.status === 401) {
                alert('Votre session a expiré. Veuillez vous reconnecter.');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/login');
                return;
            }

            if (response.ok) {
                fetchStats();
            }
        } catch (error) {
            console.error('Erreur suppression', error);
        }
    };

    const handleDeleteMessage = async (id: string) => {
        if (!confirm('Supprimer ce message ?')) return;
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/messages/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 403 || response.status === 401) {
                alert('Votre session a expiré. Veuillez vous reconnecter.');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/login');
                return;
            }

            if (response.ok) {
                fetchStats();
            }
        } catch (error) {
            console.error('Erreur suppression', error);
        }
    };

    const handleUpdateEmergencyStatus = async (id: string, newStatus: string) => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/emergencies/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // Mettre à jour l'état local pour une UI réactive
                setEmergencies(prev => prev.map(em =>
                    em.id === id ? { ...em, status: newStatus as any } : em
                ));
            }
        } catch (error) {
            console.error('Erreur mise à jour statut', error);
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Section Urgences - Prioritaire */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-red-100"
                >
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="bg-red-100 p-2 rounded-lg text-red-500">🚨</span>
                        Urgences ({emergencies.length})
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {emergencies.map(emergency => {
                            const urgency = emergency.urgencyLevel || emergency.urgency_level;
                            const contactOk = emergency.contactAgreement || emergency.contact_agreement;
                            return (
                            <div key={emergency.id} className={`p-5 rounded-xl border-l-4 shadow-sm bg-white ${urgency === 'CRITICAL' ? 'border-l-red-500 border-red-100' :
                                urgency === 'HIGH' ? 'border-l-orange-500 border-orange-100' :
                                    'border-l-yellow-500 border-yellow-100'
                                }`}>
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${urgency === 'CRITICAL' ? 'bg-red-100 text-red-600' :
                                        urgency === 'HIGH' ? 'bg-orange-100 text-orange-600' :
                                            'bg-yellow-100 text-yellow-600'
                                        }`}>
                                        {urgency}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(emergency.createdAt || emergency.created_at)}
                                    </span>
                                </div>

                                <h3 className="font-bold text-slate-800 mb-1">{emergency.name}</h3>
                                <p className="text-xs text-slate-500 mb-3 uppercase tracking-wide">{emergency.department}</p>

                                <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg">
                                    {emergency.description}
                                </p>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                    <div className="relative group/status">
                                        <button
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${emergency.status === 'PENDING' ? 'bg-red-50 text-red-600 hover:bg-red-100' :
                                                emergency.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
                                                    'bg-green-50 text-green-600 hover:bg-green-100'
                                                }`}
                                        >
                                            <div className={`w-2 h-2 rounded-full ${emergency.status === 'PENDING' ? 'bg-red-500' :
                                                emergency.status === 'IN_PROGRESS' ? 'bg-blue-500' : 'bg-green-500'
                                                }`} />
                                            <span className="text-xs font-medium">
                                                {emergency.status === 'PENDING' ? 'En attente' :
                                                    emergency.status === 'IN_PROGRESS' ? 'En cours' : 'Résolu'}
                                            </span>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className="absolute bottom-full left-0 pb-2 w-40 hidden group-hover/status:block z-10">
                                            <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                                                {[
                                                    { value: 'PENDING', label: 'En attente', color: 'text-red-600 hover:bg-red-50' },
                                                    { value: 'IN_PROGRESS', label: 'En cours', color: 'text-blue-600 hover:bg-blue-50' },
                                                    { value: 'RESOLVED', label: 'Résolu', color: 'text-green-600 hover:bg-green-50' }
                                                ].map((status) => (
                                                    <button
                                                        key={status.value}
                                                        onClick={() => handleUpdateEmergencyStatus(emergency.id, status.value)}
                                                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${status.color} ${emergency.status === status.value ? 'bg-slate-50' : ''}`}
                                                    >
                                                        {status.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {contactOk && (
                                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            Contact OK
                                        </span>
                                    )}
                                </div>
                            </div>
                        );})}
                        {emergencies.length === 0 && (
                            <div className="col-span-full text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                Aucune urgence signalée
                            </div>
                        )}
                    </div>
                </motion.div>

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
                                            <span>📅 {formatDate(idea.createdAt || idea.created_at)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteIdea(idea.id)}
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
                                        onClick={() => handleDeleteMessage(message.id)}
                                        className="text-slate-500/50 hover:text-red-500 p-2 hover:bg-white/50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-2 text-xs text-slate-500/60 text-right">
                                    {formatDateTime(message.createdAt || message.created_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
