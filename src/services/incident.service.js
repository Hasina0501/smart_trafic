const prisma = require("../prisma");

const createIncident = async (data) => {

  return await prisma.incident.create({
    data
  });

};

const getIncidents = async () => {

  return await prisma.incident.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

};


const rejectIncident = async (id) => {

  return await prisma.incident.update({
    where: {
      id
    },
    data: {
      status: "rejeté"
    }
  });

};


const verifyIncident = async (id) => {
    
    const incident = await prisma.incident.update({
        where: {
            id
        },
        data: {
            status: "attente" // remplace par VERIFIED si tu as changé l'enum
        }
    });
    
    await prisma.road.update({
        where: {
            id: 3
        },
        data: {
            traffic: 10
        }
    });
    
    return incident;
};
module.exports = {
  createIncident,
  getIncidents,
  verifyIncident,
  rejectIncident
};
