
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main(){
    const hashedPassword = await bcrypt.hash('mot de passe2', 10);

    await prisma.user.upsert({
        where: {
            email: 'hey@gmail.com'
        },
        update: {},
        create: {
            username: 'admin',
            email: 'hey@gmail.com',
            password: hashedPassword,
            Role: 'superadmin',
            isVerified: true
        }
    });
    console.log("Création de l'admin avec succes");
}
main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });