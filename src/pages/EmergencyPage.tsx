import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Send, CheckCircle, Phone, User, Building, AlertOctagon } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/Toast';

export const EmergencyPage: React.FC = () => {
    const { toast, showToast, hideToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        name: '',
        department: '',
        urgencyLevel: 'MEDIUM',
        contactAgreement: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        try {
            const response = await fetch(`${apiUrl}/api/emergencies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showToast('Urgence signalée avec succès. Un conseiller va prendre le relais.', 'success');
                setFormData({
                    description: '',
                    name: '',
                    department: '',
                    urgencyLevel: 'MEDIUM',
                    contactAgreement: false
                });
            } else {
                const data = await response.json();
                showToast(data.error || 'Erreur lors du signalement', 'error');
            }
        } catch (error) {
            showToast('Impossible de contacter le serveur', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />
            <div className="space-y-8 pb-12">
                <header className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-pastel-red/20 rounded-full mb-6 text-pastel-red"
                    >
                        <AlertTriangle className="w-10 h-10" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-slate-800 mb-4"
                    >
                        Espace Urgence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto"
                    >
                        Pour les situations graves nécessitant une intervention rapide.
                        Vos informations seront traitées en priorité par un conseiller dédié.
                    </motion.p>
                </header>

                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-pastel-red/30 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pastel-red to-red-400" />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-pastel-red focus:ring-4 focus:ring-pastel-red/10 transition-all outline-none"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Building className="w-4 h-4" />
                                        Département / Service
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-pastel-red focus:ring-4 focus:ring-pastel-red/10 transition-all outline-none"
                                        placeholder="Votre service"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <AlertOctagon className="w-4 h-4" />
                                    Niveau d'urgence
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { value: 'MEDIUM', label: 'Moyen', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                                        { value: 'HIGH', label: 'Élevé', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                                        { value: 'CRITICAL', label: 'Critique', color: 'bg-red-100 text-red-700 border-red-200' }
                                    ].map((level) => (
                                        <button
                                            key={level.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, urgencyLevel: level.value })}
                                            className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${formData.urgencyLevel === level.value
                                                    ? level.color + ' ring-2 ring-offset-2 ring-slate-200'
                                                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                                                }`}
                                        >
                                            {level.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Description de la situation</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-pastel-red focus:ring-4 focus:ring-pastel-red/10 transition-all outline-none min-h-[150px] resize-none"
                                    placeholder="Décrivez la situation en détail..."
                                />
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <input
                                    type="checkbox"
                                    id="contactAgreement"
                                    checked={formData.contactAgreement}
                                    onChange={(e) => setFormData({ ...formData, contactAgreement: e.target.checked })}
                                    className="w-5 h-5 rounded text-pastel-red focus:ring-pastel-red border-gray-300"
                                />
                                <label htmlFor="contactAgreement" className="text-sm text-slate-600 cursor-pointer select-none">
                                    J'accepte d'être contacté(e) rapidement par un conseiller pour traiter cette situation.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.contactAgreement}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Envoyer le signalement
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100">
                            <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />
                                Numéros d'aide
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>Service RH : 01 23 45 67 89</li>
                                <li>Médecine du travail : 01 98 76 54 32</li>
                                <li>Numéro vert écoute : 0800 00 00 00</li>
                            </ul>
                        </div>
                        <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100">
                            <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-slate-400" />
                                Engagement
                            </h3>
                            <p className="text-sm text-slate-600">
                                Votre signalement sera traité dans les plus brefs délais avec la plus grande confidentialité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
