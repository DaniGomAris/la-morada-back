require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/mongo-config");

const authRoutes = require("../src/modules/auth/auth-routes")
const userRoutes = require("../src/modules/user/user-routes")
const appointmentRoutes = require("../src/modules/appointment/appointment-routes")
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// Conexión a MongoDB
connectDB();

// Rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/appointment", appointmentRoutes);

// Endpoint de prueba
app.get("/", (req, res) => {
  res.json({ message: "Node.js API conectada a MongoDB" });
});

module.exports = app;
