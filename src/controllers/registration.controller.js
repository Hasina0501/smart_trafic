const registrationService = require("../services/registration.service");
const { sendSuccess, sendError } = require("../utils/response");

exports.getPendingRequests = async (req, res) => {
  try {
    const requests =
      await registrationService.getPendingRequests();

    return sendSuccess(
      res,
      "Demandes récupérées",
      requests
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.approveRequest = async (req, res) => {
  try {
    await registrationService.approveRequest(
      parseInt(req.params.id)
    );

    return sendSuccess(
      res,
      "Demande approuvée"
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    await registrationService.rejectRequest(
      parseInt(req.params.id)
    );

    return sendSuccess(
      res,
      "Demande refusée"
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};