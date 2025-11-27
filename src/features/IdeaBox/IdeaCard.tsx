import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CommentSection } from './CommentSection';

interface IdeaCardProps {
    id: string;
    title: string;
    description: string;
    likes: number;
    hasLiked: boolean;
    category?: string;
    priority?: string;
    tags?: string;
    onLike: (id: string) => void;
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
    id, title, description, likes, hasLiked, category, priority, tags, onLike
}) => {
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
            </div>

            <CommentSection ideaId={id} />
        </motion.div>
    );
};
