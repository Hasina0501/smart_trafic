const prisma = require("../prisma");

const getUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  return user;
};

const updateUser = async (id, data) => {
  const { username, email, password } = data;

  return await prisma.user.update({
    where: { id },
    data: {
      username,
      email,
      password,
    },
  });
};

const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id },
  });
};

const reboot = async () => {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
  );
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  reboot,
};
