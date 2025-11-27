const bcrypt = require('bcryptjs');

async function generateHashes() {
    const employeHash = await bcrypt.hash('Emploe@2025', 10);
    const adminHash = await bcrypt.hash('Collable@2025', 10);

    console.log('-- SQL pour créer les utilisateurs');
    console.log('-- Exécutez ce script dans Supabase SQL Editor\n');

    console.log('-- Supprimer les utilisateurs existants (optionnel)');
    console.log("DELETE FROM users WHERE username IN ('Employe', 'Collable');\n");

    console.log('-- Insérer les nouveaux utilisateurs');
    console.log('INSERT INTO users (username, password, role) VALUES');
    console.log(`  ('Employe', '${employeHash}', 'USER'),`);
    console.log(`  ('Collable', '${adminHash}', 'ADMIN');`);

    console.log('\n-- Vérifier que les utilisateurs sont créés');
    console.log('SELECT id, username, role, created_at FROM users;');
}

generateHashes();
