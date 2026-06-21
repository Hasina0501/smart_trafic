const incidentService = require("../services/incident.service");

exports.createIncident = async (req, res) => {

  try {

    const incident = await incidentService.createIncident(
      req.body
    );

    return res.status(201).json({
      success: true,
      data: incident
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getIncidents = async (req, res) => {

  try {

    const incidents =
      await incidentService.getIncidents();

    return res.status(200).json({
      success: true,
      data: incidents
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.verifyIncident = async (req, res) => {

  try {

    const incident =
      await incidentService.verifyIncident(
        parseInt(req.params.id)
      );

    return res.status(200).json({
      success: true,
      data: incident
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.rejectIncident = async (req, res) => {

  try {

    const incident =
      await incidentService.rejectIncident(
        parseInt(req.params.id)
      );

    return res.status(200).json({
      success: true,
      data: incident
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
