const express = require("express");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// Middlewares
app.use(express.json());

// Rutas de la API
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

module.exports = app;
