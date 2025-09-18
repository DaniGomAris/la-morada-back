const argon2 = require("argon2");

// Security configuration
const argon2Options = {
  type: argon2.argon2id,
  timeCost: 3,              // Number of iterations
  memoryCost: 2 ** 16,      // 64 MB
  parallelism: 2,           // Threads
  hashLength: 32,           // Len
  saltLength: 16            // Salt len
};

// Generate password hash
async function hashPassword(password) {
  return await argon2.hash(password, argon2Options);
}

// Verify the pasword matches with hash
async function verifyPassword(hashedPassword, plainPassword) {
  try {
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (err) {
    return false;
  }
}

module.exports = {
  hashPassword,
  verifyPassword
};
