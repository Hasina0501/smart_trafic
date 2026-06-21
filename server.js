require('dotenv').config();

const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const app = express();
const routeRoutes = require("./src/routes/route.routes");
const incidentRoutes = require("./src/routes/incident.routes");

const authRoutes = require('./src/routes/auth.routes');
const villeRoutes = require('./src/routes/ville.route')
const IncidentRoutes = require('./src/routes/incident.route')

app.use(express.json());

app.use('/api/incidents', incidentRoutes)
app.use('/api/users', userRoutes);
app.use('/api/routes', routeRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/ville', villeRoutes)
app.use('/api/incident', IncidentRoutes);
app.get('/', (req, res) => {
    res.send('API OK');
});
const PORT = process.env.PORT || 3000;
const registrationRoutes = require("./src/routes/registration.routes");
app.use('/api/registrations', registrationRoutes);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});