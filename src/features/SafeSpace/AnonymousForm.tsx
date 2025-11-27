import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Lock, ChevronDown, ChevronUp } from 'lucide-react';

interface AnonymousFormProps {
    onSubmit: (data: {
        content: string;
        title?: string;
        category?: string;
        mood?: string;
        isAdvanced?: boolean;
    }) => void;
}

const CATEGORIES = [
    { value: 'general', label: 'Général', emoji: '💬', color: 'bg-pastel-blue/40' },
    { value: 'emotion', label: 'Émotions', emoji: '💙', color: 'bg-pastel-lavender/40' },
    { value: 'stress', label: 'Stress/Anxiété', emoji: '😰', color: 'bg-pastel-peach/40' },
    { value: 'joy', label: 'Joie/Gratitude', emoji: '😊', color: 'bg-pastel-mint/40' },
    { value: 'reflection', label: 'Réflexion', emoji: '🤔', color: 'bg-pastel-cream/60' },
    { value: 'support', label: 'Besoin de soutien', emoji: '🤝', color: 'bg-pastel-pink/40' },
];

const MOODS = [
    { value: 'happy', emoji: '😊', label: 'Heureux' },
    { value: 'sad', emoji: '😢', label: 'Triste' },
    { value: 'anxious', emoji: '😰', label: 'Anxieux' },
    { value: 'calm', emoji: '😌', label: 'Calme' },
    { value: 'angry', emoji: '😠', label: 'En colère' },
    { value: 'confused', emoji: '😕', label: 'Confus' },
    { value: 'grateful', emoji: '🙏', label: 'Reconnaissant' },
    { value: 'hopeful', emoji: '🌟', label: 'Plein d\'espoir' },
];

export const AnonymousForm: React.FC<AnonymousFormProps> = ({ onSubmit }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [mood, setMood] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setIsSending(true);
            // Simulate a small delay for the animation
            await new Promise(resolve => setTimeout(resolve, 500));
            onSubmit({
                content: message,
                title: isAdvanced && title ? title : undefined,
                category: isAdvanced && category ? category : undefined,
                mood: isAdvanced && mood ? mood : undefined,
                isAdvanced
            });
            setMessage('');
            setTitle('');
            setCategory('');
            setMood('');
            setIsSending(false);
        }
    };

    return (
        <motion.form
            layout
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-pastel-lavender/30"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-pastel-lavender">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Anonymat garanti</span>
                </div>

                <button
                    type="button"
                    onClick={() => setIsAdvanced(!isAdvanced)}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-pastel-lavender transition-colors"
                >
                    <span>{isAdvanced ? 'Mode simple' : 'Mode avancé'}</span>
                    {isAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {isAdvanced && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 mb-4"
                    >
                        {/* Titre optionnel */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-2">
                                Titre (optionnel)
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Donnez un titre à votre message..."
                                className="w-full bg-slate-50/50 rounded-xl px-4 py-2 text-slate-700 placeholder-slate-400 border-none focus:ring-2 focus:ring-pastel-lavender/50 transition-all"
                            />
                        </div>

                        {/* Catégorie */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-2">
                                Catégorie
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => setCategory(cat.value)}
                                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${category === cat.value
                                                ? `${cat.color} ring-2 ring-pastel-lavender/50 font-medium`
                                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                                            }`}
                                    >
                                        <span className="text-lg">{cat.emoji}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Humeur */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-2">
                                Comment vous sentez-vous ?
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {MOODS.map((m) => (
                                    <button
                                        key={m.value}
                                        type="button"
                                        onClick={() => setMood(m.value)}
                                        className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg text-xs transition-all ${mood === m.value
                                            ? 'bg-pastel-lavender/30 ring-2 ring-pastel-lavender/50 font-medium'
                                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                                            }`}
                                        title={m.label}
                                    >
                                        <span className="text-2xl">{m.emoji}</span>
                                        <span className="text-[10px]">{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
