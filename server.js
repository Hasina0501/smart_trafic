require('dotenv').config();

const express = require('express');
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const app = express();
app.use(express.json());
app.use(cors());

//les noms des routes 

const authRoutes = require('./src/routes/auth.routes');
const villeRoutes = require('./src/routes/ville.route')
const IncidentRoutes = require('./src/routes/incident.route')
const userRoutes = require("./src/routes/user.routes")
const registrationRoutes = require("./src/routes/registration.routes");

//les apis des routes par defaut

app.use('/api/auth', authRoutes);
app.use('/api/ville', villeRoutes)
app.use('/api/incident', IncidentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/registrations', registrationRoutes);



//route de test
app.get('/', (req, res) => {
    res.send('API OK');
});

const { user } = require('./src/prisma');

const PORT = process.env.PORT || 5000;
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});