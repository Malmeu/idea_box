import { useState, useCallback } from 'react';

interface ToastState {
    message: string;
    type: 'error' | 'success' | 'info';
    isVisible: boolean;
}

export const useToast = () => {
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: 'info',
        isVisible: false
    });

    const showToast = useCallback((message: string, type: 'error' | 'success' | 'info' = 'info') => {
        setToast({ message, type, isVisible: true });
        
        // Auto-fermeture après 5 secondes
        setTimeout(() => {
            setToast(prev => ({ ...prev, isVisible: false }));
        }, 5000);
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
    }, []);

    return {
        toast,
        showToast,
        hideToast
    };
};
