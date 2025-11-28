import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { formatTime } from '../../utils/formatDate';

interface MessageCardProps {
    message: string;
    color: string;
    date: string;
    title?: string;
    category?: string;
    mood?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
    'general': '💬 Général',
    'emotion': '💙 Émotions',
    'stress': '😰 Stress/Anxiété',
    'joy': '😊 Joie/Gratitude',
    'reflection': '🤔 Réflexion',
    'support': '🤝 Besoin de soutien',
};

const MOOD_EMOJIS: Record<string, string> = {
    'happy': '😊',
    'sad': '😢',
    'anxious': '😰',
    'calm': '😌',
    'angry': '😠',
    'confused': '😕',
    'grateful': '🙏',
    'hopeful': '🌟',
};

export const MessageCard: React.FC<MessageCardProps> = ({ 
    message, 
    color, 
    date, 
    title, 
    category, 
    mood
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={clsx(
                "rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 wrap-break-word break-inside-avoid mb-6",
                color
            )}
        >
            {/* En-tête avec catégorie et humeur */}
            {(category || mood) && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200/50">
                    {category && (
                        <span className="text-xs bg-white/50 px-2 py-1 rounded-full">
                            {CATEGORY_LABELS[category] || category}
                        </span>
                    )}
                    {mood && (
                        <span className="text-lg" title={mood}>
                            {MOOD_EMOJIS[mood] || '💭'}
                        </span>
                    )}
                </div>
            )}

            {/* Titre si présent */}
            {title && (
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {title}
                </h3>
            )}

            {/* Message principal */}
            <p className="text-slate-700 font-medium leading-relaxed font-handwriting wrap-break-word">
                "{message}"
            </p>

            {/* Pied de page avec heure */}
            <div className="mt-4 text-right">
                <span className="text-xs text-slate-500/80">
                    {formatTime(date)}
                </span>
            </div>
        </motion.div>
    );
};
