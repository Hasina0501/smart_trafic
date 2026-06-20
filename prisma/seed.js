const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main(){
    const hashedPassword = await bcrypt.hash('mot de passe', 10);

    await prsma.user.upsert({
        where: {
            email: 'admin@gmail.com'
        },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            Role: 'admin'
        }
    });
    console.log("Création de l'admin avec succes");
}
main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });