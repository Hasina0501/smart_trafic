const prisma = require("../prisma");

const getPendingRequests = async () => {
  return await prisma.registrationRequest.findMany({
    where: {
      status: "attente"
    }
  });
};

const approveRequest = async (id) => {
  const request = await prisma.registrationRequest.findUnique({
    where: { id }
  });

  if (!request) {
    throw new Error("Demande introuvable");
  }

  await prisma.user.create({
    data: {
      username: request.username,
      email: request.email,
      password: request.password,
      Role: "admin"
    }
  });

  await prisma.registrationRequest.update({
    where: { id },
    data: {
      status: "approuver"
    }
  });
};

const rejectRequest = async (id) => {
  await prisma.registrationRequest.update({
    where: { id },
    data: {
      status: "rejeter"
    }
  });
};

module.exports = {
  getPendingRequests,
  approveRequest,
  rejectRequest
};