const express = require("express");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// Middlewares
// Parsear JSON para todas las rutas
app.use(express.json());

// Rutas de la API
// Rutas de usuarios
app.use("/api/users", userRoutes);

// Rutas de citas
app.use("/api/appointments", appointmentRoutes);

module.exports = app;
