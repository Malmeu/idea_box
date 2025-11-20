import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';


interface Comment {
    id: string;
    content: string;
    username: string;
    createdAt: string;
}

interface IdeaCardProps {
    id: string;
    title: string;
    description: string;
    likes: number;
    commentsCount: number;
    comments: Comment[];
    hasLiked: boolean;
    category?: string;
    priority?: string;
    tags?: string;
    onLike: (id: string) => void;
    onAddComment: (id: string, content: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
    'innovation': '💡 Innovation',
    'improvement': '⚡ Amélioration',
    'event': '🎉 Événement',
    'wellbeing': '🌸 Bien-être',
    'environment': '🌱 Environnement',
    'other': '✨ Autre',
};

const PRIORITY_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
    'low': { emoji: '🟢', label: 'Basse', color: 'text-green-600' },
    'medium': { emoji: '🟡', label: 'Moyenne', color: 'text-yellow-600' },
    'high': { emoji: '🔴', label: 'Haute', color: 'text-red-600' },
};

export const IdeaCard: React.FC<IdeaCardProps> = ({
    id, title, description, likes, commentsCount, comments, hasLiked, category, priority, tags, onLike, onAddComment
}) => {
    const [showComments, setShowComments] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(id, newComment);
            setNewComment('');
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
        >
            {/* En-tête avec catégorie et priorité */}
            {(category || priority) && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                    {category && (
                        <span className="text-xs bg-pastel-blue/20 px-2 py-1 rounded-full text-slate-700">
                            {CATEGORY_LABELS[category] || category}
                        </span>
                    )}
                    {priority && PRIORITY_CONFIG[priority] && (
                        <span className={`text-xs flex items-center gap-1 ${PRIORITY_CONFIG[priority].color}`}>
                            <span>{PRIORITY_CONFIG[priority].emoji}</span>
                            <span className="font-medium">{PRIORITY_CONFIG[priority].label}</span>
                        </span>
                    )}
                </div>
            )}

            <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>

            {/* Tags */}
            {tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.split(',').map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                        >
                            #{tag.trim()}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <button
                    onClick={() => onLike(id)}
                    className={`flex items-center gap-2 transition-colors group ${hasLiked ? 'text-pastel-pink' : 'text-slate-500 hover:text-pastel-pink'}`}
                >
                    <div className={`p-2 rounded-full transition-colors ${hasLiked ? 'bg-pastel-pink/20' : 'bg-slate-50 group-hover:bg-pastel-pink/20'}`}>
                        <Heart className={`w-5 h-5 transition-transform ${hasLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
                    </div>
                    <span className="font-medium">{likes}</span>
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-slate-500 hover:text-pastel-blue transition-colors group"
                >
                    <div className="p-2 rounded-full bg-slate-50 group-hover:bg-pastel-blue/20 transition-colors">
                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium">{commentsCount}</span>
                </button>
            </div>

            {showComments && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-slate-50 space-y-4"
                >
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                        {comments.map(comment => (
                            <div key={comment.id} className="bg-slate-50 p-3 rounded-xl text-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-slate-700">{comment.username}</span>
                                    <span className="text-xs text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-slate-600">{comment.content}</p>
                            </div>
                        ))}
                        {comments.length === 0 && (
                            <p className="text-center text-slate-400 text-sm py-2">Aucun commentaire pour le moment.</p>
                        )}
                    </div>

                    <form onSubmit={handleCommentSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Votre commentaire..."
                            className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-pastel-blue/50"
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="bg-pastel-blue text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-pastel-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Envoyer
                        </button>
                    </form>
                </motion.div>
            )}
        </motion.div>
    );
};
