import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

interface IdeaFormProps {
    onSubmit: (title: string, description: string) => void;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onSubmit(title, description);
            setTitle('');
            setDescription('');
            setIsFocused(false);
        }
    };

    return (
        <motion.form
            layout
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 shadow-lg border border-pastel-blue/20 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Sparkles className="w-24 h-24 text-pastel-blue" />
            </div>

            <div className="space-y-4 relative z-10">
                <div>
                    <input
                        type="text"
                        placeholder="Un titre accrocheur..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        className="w-full text-xl font-bold text-slate-800 placeholder-slate-400 bg-transparent border-none focus:ring-0 p-0"
                    />
                </div>

                <motion.div
                    animate={{ height: isFocused || description ? 'auto' : '40px' }}
                    className="overflow-hidden"
                >
                    <textarea
                        placeholder="Décrivez votre idée géniale..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        className="w-full text-slate-600 placeholder-slate-400 bg-transparent border-none focus:ring-0 p-0 resize-none min-h-[100px]"
                    />
                </motion.div>

                <div className="flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!title.trim() || !description.trim()}
                        className="bg-pastel-blue text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
                    >
                        <span>Partager</span>
                        <Send className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.form>
    );
};
