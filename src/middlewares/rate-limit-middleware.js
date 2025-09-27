const rateLimit = require('express-rate-limit');

const RATELIMIT = process.env.RATELIMIT;

const loginLimiter = rateLimit({
  windowMs: RATELIMIT, // 15 min
  max: 5, // máximo 5 intentos
  message: "Demasiados intentos de login, intenta mas tarde",
});

module.exports = { loginLimiter };
