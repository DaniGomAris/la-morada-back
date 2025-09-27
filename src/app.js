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
const availabilityRoutes = require("../src/modules/availability/availability-routes");
const productRoutes = require("../src/modules/product/product-routes");
const cartRoutes = require("../src/modules/cart/cart-routes");
const postRoutes = require("../src/modules/post/post-routes");
const podcastRoutes = require("../src/modules/podcast/podcast-routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(requestLogger);

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
