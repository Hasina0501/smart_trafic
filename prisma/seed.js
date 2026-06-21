const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("mot de passe", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@gmail.com",
    },
    update: {},
    create: {
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      Role: "superadmin",
      isVerified: true,
    },
  });
  console.log("Création de l'admin avec succes");
  await prisma.road.createMany({
    data: [
      {
        name: "RondPoint-Ambatomena-Centre",
        startLat: -21.449,
        startLng: 47.0843,
        endLat: -21.448,
        endLng: 47.086,
        distance: 200,
      },
      {
        name: "RondPoint-Ambatomena-Gymnase",
        startLat: -21.449,
        startLng: 47.0843,
        endLat: -21.4475,
        endLng: 47.083,
        distance: 180,
      },
      {
        name: "RondPoint-Ambatomena-Colisee",
        startLat: -21.449,
        startLng: 47.0843,
        endLat: -21.4505,
        endLng: 47.0825,
        distance: 250,
      },
      {
        name: "Centre-Gymnase",
        startLat: -21.448,
        startLng: 47.086,
        endLat: -21.4475,
        endLng: 47.083,
        distance: 300,
      },
      {
        name: "Centre-Colisee",
        startLat: -21.448,
        startLng: 47.086,
        endLat: -21.4505,
        endLng: 47.0825,
        distance: 400,
      },
    ],
  });
}
main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });