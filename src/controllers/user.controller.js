const userService = require("../services/user.service");

const {
  sendSuccess,
  sendError,
} = require("../utils/response");

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    return sendSuccess(
      res,
      "Liste des utilisateurs",
      users
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(
      parseInt(req.params.id)
    );

    return sendSuccess(
      res,
      "Utilisateur trouvé",
      user
    );
  } catch (error) {
    return sendError(res, error.message, 404);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      parseInt(req.params.id),
      req.body
    );

    return sendSuccess(
      res,
      "Utilisateur mis à jour",
      user
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(
      parseInt(req.params.id)
    );

    return sendSuccess(
      res,
      "Utilisateur supprimé"
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.reboot = async (req, res) => {
  try {
    await userService.reboot();

    return sendSuccess(
      res,
      "DB reset"
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};