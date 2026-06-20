const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const createVille = async (payload) => {
    const { nomVille } = payload
    

    return await prisma.ville.create({
        data: {
            nomVille: nomVille
        },
    })
}

const getVilles = async () => {
    return await prisma.ville.findMany()
}

const getVilleById = async (id) => {
    console.log("id reçu =", id, typeof id);
    return await prisma.ville.findUnique({
        where: { id },
    })
}

const updateVille = async (id, data) => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error("Aucune donnée fournie pour la mise à jour")
    }

    return await prisma.ville.update({
        where: { id },
        data,
    })
}

const deleteVille = async (id) => {
    return await prisma.ville.delete({
        where: { id },
    })
}

module.exports = {
    createVille,
    getVilles,
    getVilleById,
    updateVille,
    deleteVille,
}