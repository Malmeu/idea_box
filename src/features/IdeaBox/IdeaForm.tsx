import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface IdeaFormProps {
    onSubmit: (data: {
        title: string;
        description: string;
        category?: string;
        priority?: string;
        tags?: string;
        isAdvanced?: boolean;
    }) => void;
}

const IDEA_CATEGORIES = [
    { value: 'innovation', label: 'Innovation', emoji: '💡', color: 'bg-pastel-blue/40' },
    { value: 'improvement', label: 'Amélioration', emoji: '⚡', color: 'bg-pastel-mint/40' },
    { value: 'event', label: 'Événement', emoji: '🎉', color: 'bg-pastel-pink/40' },
    { value: 'wellbeing', label: 'Bien-être', emoji: '🌸', color: 'bg-pastel-lavender/40' },
    { value: 'environment', label: 'Environnement', emoji: '🌱', color: 'bg-pastel-green/40' },
    { value: 'other', label: 'Autre', emoji: '✨', color: 'bg-pastel-cream/60' },
];

const PRIORITIES = [
    { value: 'low', label: 'Basse', emoji: '🟢', color: 'bg-green-50' },
    { value: 'medium', label: 'Moyenne', emoji: '🟡', color: 'bg-yellow-50' },
    { value: 'high', label: 'Haute', emoji: '🔴', color: 'bg-red-50' },
];

export const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onSubmit({
                title,
                description,
                category: isAdvanced && category ? category : undefined,
                priority: isAdvanced && priority ? priority : undefined,
                tags: isAdvanced && tags ? tags : undefined,
                isAdvanced
            });
            setTitle('');
            setDescription('');
            setCategory('');
            setPriority('');
            setTags('');
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
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-600">Nouvelle idée</h3>
                    <button
                        type="button"
                        onClick={() => setIsAdvanced(!isAdvanced)}
                        className="flex items-center gap-1 text-xs text-slate-600 hover:text-pastel-blue transition-colors"
                    >
                        <span>{isAdvanced ? 'Mode simple' : 'Mode avancé'}</span>
                        {isAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

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

                <AnimatePresence mode="wait">
                    {isAdvanced && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 pt-4 border-t border-slate-100"
                        >
                            {/* Catégorie */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-2">
                                    Catégorie
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {IDEA_CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setCategory(cat.value)}
                                            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${category === cat.value
                                                ? `${cat.color} ring-2 ring-pastel-blue/50 font-medium`
                                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                                                }`}
                                        >
                                            <span className="text-lg">{cat.emoji}</span>
                                            <span>{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Priorité */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-2">
                                    Priorité
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {PRIORITIES.map((p) => (
                                        <button
                                            key={p.value}
                                            type="button"
                                            onClick={() => setPriority(p.value)}
                                            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${priority === p.value
                                                ? `${p.color} ring-2 ring-pastel-blue/50 font-medium`
                                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                                                }`}
                                        >
                                            <span>{p.emoji}</span>
                                            <span>{p.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-2">
                                    Tags (séparés par des virgules)
                                </label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="ex: technologie, écologie, social"
                                    className="w-full bg-slate-50/50 rounded-xl px-4 py-2 text-sm text-slate-700 placeholder-slate-400 border-none focus:ring-2 focus:ring-pastel-blue/50 transition-all"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-end pt-2">
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
