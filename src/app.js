require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/mongo-config");
const redisClient = require("./config/redis-config");

const logger = require("./utils/logger");
const requestLogger = require("./middlewares/logger-middleware");
const { handleError } = require("./handlers/error-handler");

const {
  authRoutes,
  userRoutes,
  appointmentRoutes,
  availabilityRoutes,
  productRoutes,
  cartRoutes,
  postRoutes,
  podcastRoutes,
  paymentRoutes
} = require("./modules");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(requestLogger);
app.use(helmet());

// MOngo DB connection
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/availability", availabilityRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/post", postRoutes);
app.use("/podcast", podcastRoutes);
app.use("/payment", paymentRoutes);

// Global middleware
app.use((err, req, res, next) => {
  handleError(res, err);
});

// Test Endpoint
app.get("/", (req, res) => {
  res.json({ message: "Node.js API connected to MongoDB & Redis" });
  logger.http("GET / llamado");
});

module.exports = app;
