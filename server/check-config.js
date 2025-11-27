#!/usr/bin/env node

/**
 * Script de vérification de la configuration Supabase
 * Exécutez avec: node check-config.js
 */

require('dotenv').config();

console.log('\n🔍 Vérification de la configuration Supabase...\n');

let hasErrors = false;

// Vérifier les variables d'environnement serveur
console.log('📋 Variables d\'environnement serveur:');
const serverVars = {
    'SUPABASE_URL': process.env.SUPABASE_URL,
    'SUPABASE_SERVICE_KEY': process.env.SUPABASE_SERVICE_KEY,
    'JWT_SECRET': process.env.JWT_SECRET,
    'PORT': process.env.PORT
};

for (const [key, value] of Object.entries(serverVars)) {
    if (!value || value.includes('your_')) {
        console.log(`  ❌ ${key}: Non configuré`);
        hasErrors = true;
    } else {
        const displayValue = key.includes('KEY') || key.includes('SECRET')
            ? value.substring(0, 10) + '...'
            : value;
        console.log(`  ✅ ${key}: ${displayValue}`);
    }
}

// Tester la connexion Supabase
console.log('\n🔌 Test de connexion Supabase:');
if (!hasErrors) {
    const { supabase } = require('./supabase');

    supabase
        .from('users')
        .select('count')
        .then(({ data, error }) => {
            if (error) {
                console.log('  ❌ Erreur de connexion:', error.message);
                console.log('  💡 Vérifiez que:');
                console.log('     - Les tables sont créées dans Supabase');
                console.log('     - Les clés API sont correctes');
                console.log('     - Les policies RLS sont configurées');
            } else {
                console.log('  ✅ Connexion réussie !');
                console.log('  ℹ️  Base de données accessible');
            }
        })
        .catch(err => {
            console.log('  ❌ Erreur:', err.message);
        });
} else {
    console.log('  ⏭️  Ignoré (variables manquantes)');
}

console.log('\n📝 Prochaines étapes:');
if (hasErrors) {
    console.log('  1. Créez un projet sur https://supabase.com');
    console.log('  2. Copiez vos clés API depuis Settings > API');
    console.log('  3. Mettez à jour le fichier .env');
    console.log('  4. Exécutez le script SQL dans Supabase SQL Editor');
    console.log('  5. Relancez ce script pour vérifier');
} else {
    console.log('  1. Exécutez le script SQL (si pas encore fait)');
    console.log('  2. Lancez: node seed.js');
    console.log('  3. Démarrez le serveur: npm start');
}

console.log('\n');
