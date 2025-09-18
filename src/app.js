require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/mongo-config");
const redisClient = require("./config/redis-config");

const logger = require("./utils/logger");
const requestLogger = require("./middlewares/logger-middleware");
const { handleError } = require("./handlers/error-handler");

const authRoutes = require("../src/modules/auth/auth-routes");
const userRoutes = require("../src/modules/user/user-routes");
const appointmentRoutes = require("../src/modules/appointment/appointment-routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(requestLogger);

// MOngo DB connection
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/appointment", appointmentRoutes);

// Global middleware
app.use((err, req, res, next) => {
  handleError(res, err);
});

// Test Endpoint
app.get("/", (req, res) => {
  res.json({ message: "Node.js API connected to MongoDB & Redis " });
  logger.http("GET / llamado");
});

module.exports = app;
