const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const createIncident = async (payload) => {
    const { type, ville, description, image, latitude, longitude} = payload
    console.log(Object.keys(prisma))
    
    return await prisma.Incident.create({
        data: {
            type: type,
            description: description,
            imageUrl: image,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            ville: ville
        }
    })
}

const getIncidents = async () => {
    return await prisma.incident.findMany()
}

const getIncidentById = async (id) => {
    return await prisma.incident.findUnique({
        where: { id },
    })
}

const updateIncident = async (id, data) => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error("Aucune donnée fournie pour la mise à jour")
    }

    return await prisma.incident.update({
        where: { id },
        data,
    })
}

const deleteIncident = async (id) => {
    return await prisma.incident.delete({
        where: { id },
    })
}

module.exports = {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
}
