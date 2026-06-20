const prisma = require('../prisma');

const {
    sendSuccess,
    sendCreated,
    sendError
} = require('../utils/response');

exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        return sendSuccess(res, "Liste des utilisateurs", users);
    }
    catch (error) {
        return sendError(res, error.message);
    }
};


exports.getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return sendError(res, "Utilisateur introuvable", 404);
        }

        return sendSuccess(res, "Utilisateur trouvé", user);
    }
    catch (error) {
        return sendError(res, error.message);
    }
};


exports.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const { username, email, password } = req.body;

        const user = await prisma.user.update({
            where: { id },
            data: {
                username,
                email,
                password
            }
        });

        return sendSuccess(res, "Utilisateur mis à jour", user);
    }
    catch (error) {
        return sendError(res, error.message);
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.user.delete({
            where: { id }
        });

        return sendSuccess(res, "Utilisateur supprimé");
    }
    catch (error) {
        return sendError(res, error.message);
    }
};


exports.reboot = async (req, res) => {
    try {
        await prisma.$executeRawUnsafe(
            `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
        );

        return sendSuccess(res, "DB reset");
    }
    catch (error) {
        return sendError(res, error.message);
    }
};