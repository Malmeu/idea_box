const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('Collable@2025', 10);
    const userPassword = await bcrypt.hash('Employe@2025', 10);

    // Admin User
    await prisma.user.upsert({
        where: { username: 'Collable' },
        update: { password: adminPassword, role: 'ADMIN' },
        create: {
            username: 'Collable',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    // Standard User
    await prisma.user.upsert({
        where: { username: 'Employe' },
        update: { password: userPassword, role: 'USER' },
        create: {
            username: 'Employe',
            password: userPassword,
            role: 'USER',
        },
    });

    console.log("Users seeded: Collable (ADMIN), Employe (USER)");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
