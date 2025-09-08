const express = require("express");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// Middlewares
// Parsear JSON para todas las rutas
app.use(express.json());

// Rutas de la API
app.use("/api/users", userRoutes); // Rutas de usuarios

app.use("/api/appointments", appointmentRoutes); // Rutas de citas

module.exports = app;
