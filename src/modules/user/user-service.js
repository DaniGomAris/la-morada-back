const User = require("./models/user-model");
const Cart = require("../cart/model/cart-model");
const { validateUser } = require("./validators/user-validator");
const { hashPassword } = require("../auth/strategies/password-strategy");
const logger = require("../../utils/logger");

class UserService {
  // Register user
  static async register(data) {
    try {
      validateUser(data);

      const existingById = await User.findById(data._id);
      if (existingById) throw new Error("ID EXISTS");

      const existingByEmail = await User.findOne({ email: data.email });
      if (existingByEmail) throw new Error("EMAIL EXISTS");

      const hashedPassword = await hashPassword(data.password);

      const user = new User({
        ...data,
        password: hashedPassword,
        role: "patient" // default role
      });

      await user.save();
      logger.info(`User registered: ${data.email}`);

      // Crear carrito vacío
      const cart = new Cart({
        total: 0,
        products_id: []
      });
      await cart.save();

      user.cart_id = cart._id;
      await user.save();
      logger.info(`Cart created and linked for user: ${data.email}`);

      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (err) {
      logger.error(`UserService.register: ${err.message}`);
      throw err;
    }
  }

  // Update user
  static async update(userId, updates) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("USER NOT FOUND");

      const allowedFields = ["name", "last_name1", "last_name2", "email", "phone", "age", "password"];
      const invalidFields = Object.keys(updates).filter(f => !allowedFields.includes(f));
      if (invalidFields.length > 0) throw new Error("FIELDS NOT UPDATABLE");

      const dataToValidate = { ...user.toObject(), ...updates, password: updates.password, rePassword: updates.password };
      validateUser(dataToValidate);

      for (const field of allowedFields) {
        if (updates[field] !== undefined) {
          if (field === "password") {
            user.password = await hashPassword(updates.password);
          } else {
            user[field] = updates[field];
          }
        }
      }

      await user.save();
      logger.info(`User updated: ${userId}`);

      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (err) {
      logger.error(`UserService.update: ${err.message}`);
      throw err;
    }
  }

  // Get all patients
  static async getPatients() {
    try {
      const patients = await User.find({ role: "patient" })
        .select("name last_name1 last_name2 age email phone")
        .lean();

      logger.info(`Fetched all patients`);
      return patients.map(({ password, ...u }) => u);
    } catch (err) {
      logger.error(`UserService.getPatients: ${err.message}`);
      throw err;
    }
  }

  // Get all psychologists
  static async getPsychologists() {
    try {
      const psychologists = await User.find({ role: "psychologist" })
        .select("name last_name1 last_name2 age email phone specialty")
        .lean();

      logger.info(`Fetched all psychologists`);
      return psychologists.map(({ password, ...u }) => u);
    } catch (err) {
      logger.error(`UserService.getPsychologists: ${err.message}`);
      throw err;
    }
  }
}

module.exports = UserService;
