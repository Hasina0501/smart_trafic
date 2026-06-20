<<<<<<< HEAD
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const name = process.env.SUPER_ADMIN_NAME; // nom du super Admin
  const email = process.env.SUPER_ADMIN_EMAIL;  //email du user dans .env
  const password = process.env.SUPER_ADMIN_PASSWORD;  //password du user dans .env
  const hashedPassword = await bcrypt.hash(password, 10);  //password crypté

  // creer un superAdmin s' il n'existe pas encore
  const superAdmin = await prisma.User.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password: hashedPassword,
      role: "Super_Admin"  //role de l' utilisateur
    }
  });

  console.log("Super Admin créé :", superAdmin); //message si success
}

main()
  .catch(e => console.error(e))  //message si erreur
  .finally(async () => await prisma.$disconnect());
=======
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
>>>>>>> cc86a7539ca34cf102da27cf62457d893cecccb4
