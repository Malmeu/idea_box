import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IdeaForm } from '../features/IdeaBox/IdeaForm';
import { IdeaCard } from '../features/IdeaBox/IdeaCard';

interface Comment {
    id: string;
    content: string;
    username: string;
    createdAt: string;
}

interface Idea {
    id: string;
    title: string;
    description: string;
    likes: number;
    commentsCount: number;
    comments: Comment[];
    hasLiked: boolean;
    createdAt: string;
}

export const IdeaBoxPage: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);

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

    const handleAddIdea = async (title: string, description: string) => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/ideas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description }),
            });
            const newIdea = await response.json();
            setIdeas([newIdea, ...ideas]);
        } catch (error) {
            console.error('Erreur ajout idée', error);
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

    const handleAddComment = async (id: string, content: string) => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/ideas/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                const newComment = await response.json();
                setIdeas(ideas.map(idea =>
                    idea.id === id ? {
                        ...idea,
                        comments: [newComment, ...idea.comments],
                        commentsCount: idea.commentsCount + 1
                    } : idea
                ));
            }
        } catch (error) {
            console.error('Erreur ajout commentaire', error);
        }
    };

    return (
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

            <div className="max-w-2xl mx-auto mb-12">
                <IdeaForm onSubmit={handleAddIdea} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {ideas.map((idea) => (
                        <IdeaCard
                            key={idea.id}
                            {...idea}
                            onLike={handleLike}
                            onAddComment={handleAddComment}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
