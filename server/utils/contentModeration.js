const Filter = require('bad-words');

// Initialiser le filtre avec des mots français et anglais
const filter = new Filter();

// Ajouter des mots français courants à filtrer
const frenchBadWords = [
    'merde', 'putain', 'connard', 'salope', 'enculé', 'con', 'pute',
    'bite', 'couille', 'chier', 'bordel', 'cul', 'pd', 'fdp',
    'batard', 'salaud', 'connasse', 'enfoiré', 'crétin', 'débile',
    'abruti', 'idiot', 'imbécile', 'taré', 'nul', 'pourri'
];

filter.addWords(...frenchBadWords);

/**
 * Vérifie si le contenu contient des obscénités
 * @param {string} text - Le texte à vérifier
 * @returns {boolean} - true si le texte contient des obscénités
 */
function containsProfanity(text) {
    if (!text || typeof text !== 'string') return false;
    return filter.isProfane(text);
}

/**
 * Nettoie le texte en remplaçant les obscénités par des astérisques
 * @param {string} text - Le texte à nettoyer
 * @returns {string} - Le texte nettoyé
 */
function cleanProfanity(text) {
    if (!text || typeof text !== 'string') return text;
    return filter.clean(text);
}

/**
 * Valide le contenu avant de l'enregistrer
 * @param {string} content - Le contenu à valider
 * @param {object} options - Options de validation
 * @returns {object} - { isValid: boolean, message: string, cleanedContent: string }
 */
function validateContent(content, options = {}) {
    const { 
        maxLength = 1000, 
        minLength = 1,
        allowProfanity = false 
    } = options;

    // Vérifier la longueur
    if (!content || content.trim().length < minLength) {
        return {
            isValid: false,
            message: `Le contenu doit contenir au moins ${minLength} caractère(s)`,
            cleanedContent: content
        };
    }

    if (content.length > maxLength) {
        return {
            isValid: false,
            message: `Le contenu ne peut pas dépasser ${maxLength} caractères`,
            cleanedContent: content
        };
    }

    // Vérifier les obscénités
    if (!allowProfanity && containsProfanity(content)) {
        return {
            isValid: false,
            message: 'Le contenu contient des mots inappropriés. Veuillez reformuler votre message de manière respectueuse.',
            cleanedContent: cleanProfanity(content)
        };
    }

    return {
        isValid: true,
        message: 'Contenu valide',
        cleanedContent: content
    };
}

/**
 * Anonymise les métadonnées d'une requête
 * Supprime les informations qui pourraient identifier l'utilisateur
 * @param {object} req - L'objet requête Express
 * @returns {object} - Métadonnées anonymisées (vides pour garantir l'anonymat)
 */
function anonymizeMetadata(req) {
    // Pour un vrai anonymat, on ne stocke AUCUNE métadonnée
    // Pas d'IP, pas de user-agent, pas de timestamp précis
    return {
        // On pourrait ajouter un timestamp arrondi à l'heure près si nécessaire
        // mais pour un anonymat maximal, on ne stocke rien
    };
}

module.exports = {
    containsProfanity,
    cleanProfanity,
    validateContent,
    anonymizeMetadata
};
