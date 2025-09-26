const logger = require("../utils/logger");

function requestLogger(req, res, next) {
  const start = Date.now();

  // To finish a answer, calculate method, URL, status and time
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

module.exports = requestLogger;
