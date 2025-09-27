const User = require("../user/models/user-model");
const AuthValidator = require("./validators/auth-validator");
const JwtStrategy = require("./strategies/jwt-strategy");
const logger = require("../../utils/logger");

class AuthService {
  // Login user
  static async loginUser(email, password) {
    AuthValidator.validateLogin(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      logger.error(`User not found with email: ${email}`);
      throw new Error("USER NOT FOUND");
    }

    // Validate password hash in DB
    await AuthValidator.validatePassword(user.password, password);
    AuthValidator.validateRole(user.role, ["patient", "psychologist"]);
    
    // Generate token
    const { password: _, ...userWithoutPassword } = user.toObject();
    const token = await JwtStrategy.generateToken(user._id, user.role);

    logger.info(`Login successful for user ${user._id}`);
    return { user: userWithoutPassword, token };
  }

  // Logout user
  static async logoutUser(token) {
    if (!token) {
      logger.error("Logout failed: token required");
      throw new Error("TOKEN REQUIRED");
    }

    const decoded = await JwtStrategy.verifyToken(token);
    if (!decoded) {
      logger.error("Logout failed: invalid token");
      throw new Error("INVALID TOKEN");
    }


    // Invaldiate token
    await JwtStrategy.invalidateToken(decoded.user_id);
    logger.info(`Logout successful for user ${decoded.user_id}`);
    return true;
  }
}

module.exports = AuthService;
