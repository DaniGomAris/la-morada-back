const { createLogger, format, transports, config } = require("winston");

// Level logs
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  // Color logs
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

const logger = createLogger({
  levels: customLevels.levels,
  level: "debug", // Minimum level to register logs
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Timestamp
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`; // Message format
    })
  ),
  // Destination logs
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;
