const authService =
  require("../services/auth.service");

const {
  sendSuccess,
  sendCreated,
  sendError,
} = require("../utils/response");

exports.register = async (req, res) => {
  try {
    const user =
      await authService.register(req.body);

    return sendCreated(
      res,
      "Vous êtes bien enregistré",
      user
    );

  } catch (error) {

    if (error.code === "P2002") {
      return sendError(
        res,
        "Email déjà utilisé",
        409
      );
    }

    return sendError(
      res,
      error.message
    );
  }
};

exports.login = async (req, res) => {
  try {
    const result =
      await authService.login(req.body);

    return sendSuccess(
      res,
      "Connexion réussie",
      result
    );

  } catch (error) {

    return sendError(
      res,
      error.message,
      401
    );
  }
};

exports.refresh = async (req, res) => {
  try {

    const result =
      await authService.refresh(
        req.body.refreshToken
      );

    return sendSuccess(
      res,
      "Token refreshé",
      result
    );

  } catch (error) {

    return sendError(
      res,
      error.message,
      401
    );
  }
};

exports.profile = async (req, res) => {
  return sendSuccess(
    res,
    "Profil récupéré",
    req.user
  );
};

exports.logout = async (req, res) => {
  try {

    await authService.logout(
      req.body.refreshToken
    );

    return sendSuccess(
      res,
      "Déconnexion réussie"
    );

  } catch (error) {

    return sendError(
      res,
      error.message
    );
  }
};