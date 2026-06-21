const roadService = require("../services/route.service");

exports.calculate = async (req, res) => {
  try {
    const { start, end } = req.body;

    const result = await roadService.calculate(
      start,
      end
    );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.getRoads = async (req, res) => {
  try {

    const roads = await roadService.getRoads();

    return res.status(200).json({
      success: true,
      data: roads
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.closeRoad = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const road = await roadService.closeRoad(id);

    return res.status(200).json({
      success: true,
      message: "Route fermée",
      data: road
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.openRoad = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const road = await roadService.openRoad(id);

    return res.status(200).json({
      success: true,
      message: "Route ouverte",
      data: road
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.updateTraffic = async (req, res) => {
  try {

    const id = parseInt(req.params.id);
    const { traffic } = req.body;

    const road = await roadService.updateTraffic(
      id,
      traffic
    );

    return res.status(200).json({
      success: true,
      data: road
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};