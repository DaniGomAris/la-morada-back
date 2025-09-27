const argon2 = require("argon2");

const argon2Options = {
  type: argon2.argon2id,    // Algorithm type
  timeCost: 3,              // Iterations
  memoryCost: 2 ** 16,      // Memory usage (64MB)
  parallelism: 2,           // Threads
  hashLength: 32,           // Hash size
  saltLength: 16,           // Salt size
};

class PasswordStrategy {

  //Hash password
  static async hashPassword(password) {
    return await argon2.hash(password, argon2Options);
  }

  // Verify password hash
  static async verifyPassword(hashedPassword, plainPassword) {
    try {
      return await argon2.verify(hashedPassword, plainPassword);
    } catch {
      return false;
    }
  }
}

module.exports = PasswordStrategy;
