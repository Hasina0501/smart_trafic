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