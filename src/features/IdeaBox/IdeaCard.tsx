import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';


interface IdeaCardProps {
    id: string;
    title: string;
    description: string;
    likes: number;
    comments: number;
    onLike: (id: string) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ id, title, description, likes, comments, onLike }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
        >
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <button
                    onClick={() => onLike(id)}
                    className="flex items-center gap-2 text-slate-500 hover:text-pastel-pink transition-colors group"
                >
                    <div className="p-2 rounded-full bg-slate-50 group-hover:bg-pastel-pink/20 transition-colors">
                        <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium">{likes}</span>
                </button>

                <button className="flex items-center gap-2 text-slate-500 hover:text-pastel-blue transition-colors group">
                    <div className="p-2 rounded-full bg-slate-50 group-hover:bg-pastel-blue/20 transition-colors">
                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium">{comments}</span>
                </button>
            </div>
        </motion.div>
    );
};
