import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'error' | 'success' | 'info';
    isVisible: boolean;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'error', isVisible, onClose }) => {
    const icons = {
        error: <AlertCircle className="w-5 h-5" />,
        success: <CheckCircle className="w-5 h-5" />,
        info: <AlertCircle className="w-5 h-5" />
    };

    const colors = {
        error: 'bg-red-50 border-red-200 text-red-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    const iconColors = {
        error: 'text-red-500',
        success: 'text-green-500',
        info: 'text-blue-500'
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-100 max-w-md w-full mx-4"
                >
                    <div className={`${colors[type]} rounded-2xl border-2 shadow-xl p-4 backdrop-blur-sm`}>
                        <div className="flex items-start gap-3">
                            <div className={`${iconColors[type]} shrink-0 mt-0.5`}>
                                {icons[type]}
                            </div>
                            <p className="flex-1 text-sm font-medium leading-relaxed">
                                {message}
                            </p>
                            <button
                                onClick={onClose}
                                className="shrink-0 p-1 hover:bg-white/50 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
