import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Send, Trophy } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/Toast';
import { formatDate } from '../utils/formatDate';

interface AboutUEntry {
    id: string;
    content: string;
    type: 'DREAM' | 'GOAL' | 'PASSION' | 'STORY';
    nickname: string;
    createdAt?: string;
    created_at?: string;
    isSurpriseUnlocked?: boolean;
    is_surprise_unlocked?: boolean;
}

const TYPE_CONFIG = {
    DREAM: { label: 'Rêve', icon: '✨', color: 'bg-purple-100 text-purple-600' },
    GOAL: { label: 'Objectif', icon: '🎯', color: 'bg-blue-100 text-blue-600' },
    PASSION: { label: 'Passion', icon: '❤️', color: 'bg-pink-100 text-pink-600' },
    STORY: { label: 'Histoire', icon: '📖', color: 'bg-amber-100 text-amber-600' }
};

export const AboutUPage: React.FC = () => {
    const { toast, showToast, hideToast } = useToast();
    const [entries, setEntries] = useState<AboutUEntry[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        content: '',
        type: 'DREAM' as 'DREAM' | 'GOAL' | 'PASSION' | 'STORY',
        nickname: ''
    });

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/api/about-u`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setEntries(data);
        } catch (error) {
            console.error('Erreur chargement About U', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${apiUrl}/api/about-u`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newEntry = await response.json();
                setEntries([newEntry, ...entries]);
                setFormData({ content: '', type: 'DREAM', nickname: '' });

                if (newEntry.isSurpriseUnlocked) {
                    showToast('🎉 Surprise débloquée ! Merci pour ce partage inspirant !', 'success');
                } else {
                    showToast('Partagé avec succès !', 'success');
                }
            } else {
                const data = await response.json();
                showToast(data.error || 'Erreur lors du partage', 'error');
            }
        } catch (error) {
            showToast('Impossible de contacter le serveur', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />
            <div className="space-y-8 pb-12">
                <header className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6"
                    >
                        <Sparkles className="w-10 h-10 text-purple-500" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-slate-800 mb-4"
                    >
                        About U
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto"
                    >
                        Partagez vos rêves, objectifs, passions et histoires avec l'équipe.
                        Des surprises attendent ceux qui partagent quelque chose d'inspirant ! ✨
                    </motion.p>
                </header>

                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400" />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Type de partage</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {Object.entries(TYPE_CONFIG).map(([key, config]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: key as any })}
                                            className={`py-3 px-4 rounded-xl border-2 transition-all font-medium text-sm flex flex-col items-center gap-1 ${formData.type === key
                                                ? config.color + ' border-current ring-2 ring-offset-2 ring-purple-200'
                                                : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                                                }`}
                                        >
                                            <span className="text-2xl">{config.icon}</span>
                                            <span>{config.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Votre pseudo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nickname}
                                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                                    placeholder="Choisissez un pseudo..."
                                    maxLength={20}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Votre partage</label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none min-h-[150px] resize-none"
                                    placeholder="Partagez quelque chose d'inspirant avec l'équipe..."
                                />
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <Trophy className="w-3 h-3" />
                                    Astuce : Les partages de plus de 50 caractères débloquent une surprise !
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Partager
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    <div className="mt-12 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Star className="w-6 h-6 text-amber-500" />
                            Partages de l'équipe
                        </h2>

                        <AnimatePresence mode="popLayout">
                            {entries.map((entry, idx) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all relative overflow-hidden"
                                >
                                    {(entry.isSurpriseUnlocked || entry.is_surprise_unlocked) && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-100 to-transparent w-32 h-32 flex items-start justify-end p-3">
                                            <Trophy className="w-5 h-5 text-amber-500" />
                                        </div>
                                    )}

                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${TYPE_CONFIG[entry.type].color} flex items-center gap-1`}>
                                            <span>{TYPE_CONFIG[entry.type].icon}</span>
                                            {TYPE_CONFIG[entry.type].label}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {formatDate(entry.createdAt || entry.created_at)}
                                        </span>
                                    </div>

                                    <p className="text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">
                                        {entry.content}
                                    </p>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xs">
                                                {entry.nickname.charAt(0).toUpperCase()}
                                            </div>
                                            {entry.nickname}
                                        </span>
                                        {(entry.isSurpriseUnlocked || entry.is_surprise_unlocked) && (
                                            <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                                                <Sparkles className="w-3 h-3" />
                                                Inspirant
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {entries.length === 0 && (
                            <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                Soyez le premier à partager quelque chose d'inspirant ! 🌟
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
