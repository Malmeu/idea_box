import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface MessageCardProps {
    message: string;
    color: string;
    date: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, color, date }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
                "rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 break-words break-inside-avoid mb-6",
                color
            )}
        >
            <p className="text-slate-700 font-medium leading-relaxed font-handwriting">
                "{message}"
            </p>
            <div className="mt-4 text-right">
                <span className="text-xs text-slate-500/80">
                    {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </motion.div>
    );
};
