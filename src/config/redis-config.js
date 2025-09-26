const { createClient } = require("redis");
const logger = require("../utils/logger");

const REDIS_URL = process.env.REDIS_URL;

// Redis Client
const redisClient = createClient({
  url: REDIS_URL
});

// Connection error to Redis
redisClient.on('error', err => logger.error("Redis Client Error", err));
redisClient.on("connect", () => logger.info("Connected to Redis Cloud"));

// Connection successful
redisClient.on("ready", () => logger.info("Redis client ready"));

// Redis connection
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error("Redis connection failed:", err);
    process.exit(1);
  }
})();

module.exports = redisClient;
