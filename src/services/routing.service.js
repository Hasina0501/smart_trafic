const axios = require("axios");

async function calculateRoute(start, end) {
    const response = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
            coordinates: [start, end]
        },
        {
            headers: {
                Authorization: process.env.ORS_API_KEY
            }
        }
    );

    return response.data;
}

module.exports = {
    calculateRoute
};