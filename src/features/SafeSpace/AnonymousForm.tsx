import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Lock } from 'lucide-react';

interface AnonymousFormProps {
    onSubmit: (message: string) => void;
}

export const AnonymousForm: React.FC<AnonymousFormProps> = ({ onSubmit }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setIsSending(true);
            // Simulate a small delay for the animation
            await new Promise(resolve => setTimeout(resolve, 500));
            onSubmit(message);
            setMessage('');
            setIsSending(false);
        }
    };

    return (
        <motion.form
            layout
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-pastel-lavender/30"
        >
            <div className="flex items-center gap-2 mb-4 text-pastel-lavender">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Anonymat garanti</span>
            </div>

            <div className="relative">
                <textarea
                    placeholder="Exprimez-vous librement..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50/50 rounded-xl p-4 text-slate-700 placeholder-slate-400 border-none focus:ring-2 focus:ring-pastel-lavender/50 resize-none min-h-[120px] transition-all"
                />

                <div className="absolute bottom-4 right-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        disabled={!message.trim() || isSending}
                        className="bg-pastel-lavender text-white p-3 rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden relative"
                    >
                        <AnimatePresence mode="wait">
                            {isSending ? (
                                <motion.div
                                    key="sending"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 20, opacity: 0, transition: { duration: 0.5 } }}
                                >
                                    <Send className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Send className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {isSending && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </motion.div>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.form>
    );
};
