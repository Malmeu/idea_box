import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IdeaForm } from '../features/IdeaBox/IdeaForm';
import { IdeaCard } from '../features/IdeaBox/IdeaCard';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

interface Idea {
    id: string;
    title: string;
    description: string;
    likes: number;
    hasLiked: boolean;
    createdAt: string;
    category?: string;
    priority?: string;
    tags?: string;
}

export const IdeaBoxPage: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const { toast, showToast, hideToast } = useToast();

    useEffect(() => {
        fetchIdeas();
    }, []);

    const fetchIdeas = async () => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/ideas`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            const data = await response.json();
            setIdeas(data);
        } catch (error) {
            console.error('Erreur chargement idées', error);
        }
    };

    const handleAddIdea = async (data: {
        title: string;
        description: string;
        category?: string;
        priority?: string;
        tags?: string;
        isAdvanced?: boolean;
    }) => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/ideas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    priority: data.priority,
                    tags: data.tags,
                    isAdvanced: data.isAdvanced
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Afficher l'erreur de validation
                showToast(result.error || 'Erreur lors de l\'ajout de l\'idée', 'error');
                return;
            }

            setIdeas([result, ...ideas]);
        } catch (error) {
            console.error('Erreur ajout idée', error);
            showToast('Erreur de connexion au serveur', 'error');
        }
    };

    const handleLike = async (id: string) => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/ideas/${id}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const updatedIdea = await response.json();
                setIdeas(ideas.map(idea =>
                    idea.id === id ? {
                        ...idea,
                        likes: updatedIdea.likes,
                        hasLiked: updatedIdea.hasLiked
                    } : idea
                ));
            }
        } catch (error) {
            console.error('Erreur like', error);
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
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-slate-800 mb-4"
                    >
                        Boîte à Idées
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto"
                    >
                        Partagez vos idées lumineuses pour améliorer notre quotidien.
                        Votez pour celles qui vous inspirent !
                    </motion.p>
                </header>

                <div className="max-w-2xl mx-auto mb-16">
                    <div className="relative group">
                        {/* Effet de contour animé */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-pastel-blue via-pastel-lavender to-pastel-pink rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                        <div className="relative">
                            <IdeaForm onSubmit={handleAddIdea} />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 grid md:grid-cols-2 gap-6"
                    >
                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-pastel-blue/30 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="bg-pastel-blue/20 p-2 rounded-lg text-blue-600">💡</span>
                                Bonnes pratiques
                            </h3>
                            <ul className="space-y-3 text-slate-600 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">✓</span>
                                    Soyez précis et constructif dans vos propositions.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">✓</span>
                                    Vérifiez si l'idée n'a pas déjà été proposée.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">✓</span>
                                    Utilisez des tags pertinents pour faciliter la recherche.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-pastel-pink/30 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="bg-pastel-pink/20 p-2 rounded-lg text-red-500">⚠️</span>
                                Points de vigilance
                            </h3>
                            <ul className="space-y-3 text-slate-600 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 mt-1">✕</span>
                                    Évitez les plaintes sans proposition de solution.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 mt-1">✕</span>
                                    Restez courtois dans les commentaires et débats.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 mt-1">✕</span>
                                    Ne spammez pas la même idée plusieurs fois.
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {ideas.map((idea) => (
                            <IdeaCard
                                key={idea.id}
                                id={idea.id}
                                title={idea.title}
                                description={idea.description}
                                likes={idea.likes}
                                hasLiked={idea.hasLiked}
                                category={idea.category}
                                priority={idea.priority}
                                tags={idea.tags}
                                onLike={handleLike}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};
