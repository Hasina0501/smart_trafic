const prisma = require("../prisma");

const createPublication = async (data) => {
  return await prisma.publication.create({
    data
  });
};

const getPublications = async () => {
  return await prisma.publication.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

const updatePublication = async (id, data) => {
  return await prisma.publication.update({
    where: { id },
    data
  });
};

const deletePublication = async (id) => {
  return await prisma.publication.delete({
    where: { id }
  });
};

module.exports = {
  createPublication,
  getPublications,
  updatePublication,
  deletePublication
};