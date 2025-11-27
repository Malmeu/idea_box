import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Trash2 } from 'lucide-react';

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: { username: string };
}

interface CommentSectionProps {
    ideaId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ ideaId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            fetchComments();
        }
    }, [isExpanded, ideaId]);

    const fetchComments = async () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${apiUrl}/api/ideas/${ideaId}/comments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Erreur chargement commentaires', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${apiUrl}/api/ideas/${ideaId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newComment }),
            });

            if (response.ok) {
                const comment = await response.json();
                setComments([...comments, comment]);
                setNewComment('');
            }
        } catch (error) {
            console.error('Erreur ajout commentaire', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${apiUrl}/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setComments(comments.filter(c => c.id !== commentId));
            }
        } catch (error) {
            console.error('Erreur suppression commentaire', error);
        }
    };

    return (
        <div className="mt-4 border-t border-slate-100 pt-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-pastel-blue transition-colors"
            >
                <MessageCircle className="w-4 h-4" />
                <span>{comments.length} commentaire{comments.length !== 1 ? 's' : ''}</span>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3"
                    >
                        {/* Liste des commentaires */}
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {comments.map((comment) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-slate-50 rounded-lg p-3 relative group"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <p className="text-xs font-medium text-pastel-blue mb-1">
                                                {comment.user.username}
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                {comment.content}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Formulaire d'ajout */}
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Ajouter un commentaire..."
                                className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder-slate-400 border-none focus:ring-2 focus:ring-pastel-blue/50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!newComment.trim() || isSubmitting}
                                className="bg-pastel-blue text-white p-2 rounded-lg hover:bg-pastel-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
