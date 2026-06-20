const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/token.service.js");

const {
  sendSuccess,
  sendCreated,
  sendError,
} = require("../utils/response");


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if(!validator.isEmail(email)) {
      return res.status(400).json({
        error: 'Email invalide'
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        Role: "public",
      },
    });

    const { password: _, ...safeUser } = user;

    return sendCreated(res, "Vous êtes bien enregistré", safeUser);

  } catch (error) {
    if (error.code === "P2002") {
      return sendError(res, "Email déjà utilisé", 409);
    }

    return sendError(res, error.message);
  }
};

exports.registerSU = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if(!validator.isEmail(email)) {
      return res.status(400).json({
        error: 'Email invalide'
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        Role: "admin",
      },
    });

    const { password: _, ...safeUser } = user;

    return sendCreated(res, "Vous êtes admin", safeUser);

  } catch (error) {
    if (error.code === "P2002") {
      return sendError(res, "Email déjà utilisé", 409);
    }

    return sendError(res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!validator.isEmail(email)) {
      return res.status(400).json({
        error: 'Email invalide'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return sendError(res, "Email ou mot de passe incorrect", 401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return sendError(res, "Email ou mot de passe incorrect", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
    });

    const { password: _, ...safeUser } = user;

    return sendSuccess(res, "Connexion réussie", {
      user: safeUser,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendError(res, "Refresh token absent", 401);
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      return sendError(res, "Refresh token invalide", 401);
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });

      return sendError(res, "Refresh token expiré", 401);
    }

    const user = storedToken.user;

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();

    await prisma.refreshToken.delete({
      where: { id: storedToken.id },
    });

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
    });

    return sendSuccess(res, "Token refreshé", {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.profile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
  });

  if (!user) {
    return sendError(res, "Utilisateur introuvable", 404);
  }

  const { password: _, ...safeUser } = user;

  return sendSuccess(res, "Profil récupéré", safeUser);
};

exports.logout = async (req, res) => {
  try {
    await prisma.refreshToken.deleteMany({
      where: { 
        token: refreshToken
      },
    });

    return sendSuccess(res, "Déconnexion réussie");

  } catch (error) {
    return sendError(res, error.message);
  }
};