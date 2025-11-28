/**
 * Formate une date de manière sécurisée
 * Gère les formats snake_case (created_at) et camelCase (createdAt)
 */

export const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
        return '';
    }
    
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export const formatTime = (dateString: string | undefined | null): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
        return '';
    }
    
    return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
};

export const formatDateTime = (dateString: string | undefined | null): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
        return '';
    }
    
    return date.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
