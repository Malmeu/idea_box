require('dotenv').config();
const bcrypt = require('bcryptjs');
const { supabase } = require('./supabase');

async function seed() {
    try {
        // Créer les utilisateurs
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);
        const hashedUserPassword = await bcrypt.hash('user123', 10);

        // Insérer l'admin
        const { data: admin, error: adminError } = await supabase
            .from('users')
            .insert([
                { username: 'Collable', password: hashedAdminPassword, role: 'ADMIN' }
            ])
            .select()
            .single();

        if (adminError) {
            console.log('Admin already exists or error:', adminError.message);
        } else {
            console.log('✅ Admin user created:', admin.username);
        }

        // Insérer l'utilisateur normal
        const { data: user, error: userError } = await supabase
            .from('users')
            .insert([
                { username: 'Employe', password: hashedUserPassword, role: 'USER' }
            ])
            .select()
            .single();

        if (userError) {
            console.log('User already exists or error:', userError.message);
        } else {
            console.log('✅ Regular user created:', user.username);
        }

        console.log('\n🎉 Seeding completed!');
        console.log('Admin credentials: Collable / admin123');
        console.log('User credentials: Employe / user123');

    } catch (error) {
        console.error('Error seeding:', error);
    }
}

seed();
