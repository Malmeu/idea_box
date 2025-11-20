import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnonymousForm } from '../features/SafeSpace/AnonymousForm';
import { MessageCard } from '../features/SafeSpace/MessageCard';

interface Message {
    id: string;
    content: string;
    createdAt: string;
    color: string;
    title?: string;
    category?: string;
    mood?: string;
    isAdvanced?: boolean;
}

const PASTEL_COLORS = [
    'bg-pastel-blue/40',
    'bg-pastel-pink/40',
    'bg-pastel-green/40',
    'bg-pastel-lavender/40',
    'bg-pastel-cream/60',
    'bg-pastel-mint/40',
    'bg-pastel-peach/40',
];

export const SafeSpacePage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Erreur chargement messages', error);
        }
    };

    const handleAddMessage = async (data: {
        content: string;
        title?: string;
        category?: string;
        mood?: string;
        isAdvanced?: boolean;
    }) => {
        const randomColor = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            const response = await fetch(`${apiUrl}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    content: data.content, 
                    color: randomColor,
                    title: data.title,
                    category: data.category,
                    mood: data.mood,
                    isAdvanced: data.isAdvanced
                }),
            });
            const newMessage = await response.json();
            setMessages([newMessage, ...messages]);
        } catch (error) {
            console.error('Erreur ajout message', error);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <header className="text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-slate-800 mb-4"
                >
                    Safe Space
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-600 text-lg max-w-2xl mx-auto"
                >
                    Un espace bienveillant pour vous exprimer librement et anonymement.
                    Ici, votre voix compte, sans jugement.
                </motion.p>
            </header>

            <div className="max-w-2xl mx-auto mb-16">
                <AnonymousForm onSubmit={handleAddMessage} />
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {messages.map((message) => (
                        <MessageCard
                            key={message.id}
                            message={message.content}
                            color={message.color}
                            date={message.createdAt}
                            title={message.title}
                            category={message.category}
                            mood={message.mood}
                            isAdvanced={message.isAdvanced}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
