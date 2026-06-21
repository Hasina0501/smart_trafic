const routingService = require("../services/routing.service");

exports.getRoute = async (req, res) => {
    const { start, end } = req.body;

    const route = await routingService.calculateRoute(
        start,
        end
    );

    res.json(route);
};