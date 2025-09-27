const rateLimit = require('express-rate-limit');

const RATELIMIT = process.env.RATELIMIT;

const loginLimiter = rateLimit({
  windowMs: RATELIMIT, // 15 min
  max: 5, // maximum 5 attempts
  message: "Demasiados intentos de login, intenta mas tarde",
});

module.exports = { loginLimiter };
