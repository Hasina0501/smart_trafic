require('dotenv').config();

const express = require('express');
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const app = express();
const routeRoutes = require("./src/routes/route.routes");
const incidentRoutes = require("./src/routes/incident.routes");

app.use(express.json());
app.use('/api/incidents', incidentRoutes)
app.use('/api/users', userRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('API OK');
});
const registrationRoutes = require("./src/routes/registration.routes");
app.use('/api/registrations', registrationRoutes);
const PORT = process.env.PORT || 7777;
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});