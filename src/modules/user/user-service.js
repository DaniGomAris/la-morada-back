const User = require("./models/user-model");
const { validateUser } = require("./validators/user-validator");
const { hashPassword } = require("../auth/strategies/password-strategy");

class UserService {
  // Register user
  static async register(data) {
    validateUser(data);

    // Check for duplicates
    const existingById = await User.findById(data._id);
    if (existingById) throw new Error("ID EXISTS");

    const existingByEmail = await User.findOne({ email: data.email });
    if (existingByEmail) throw new Error("EMAIL EXISTS");

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    const user = new User({
      ...data,
      password: hashedPassword,
      role: "patient" // default role
    });

    await user.save();

    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }


  // Update user
  static async update(userId, updates) {
    const user = await User.findById(userId);
    if (!user) throw new Error("USER NOT FOUND");

    // Allow only specific fields
    const allowedFields = ["name", "last_name1", "last_name2", "email", "phone", "age", "password"];
    const invalidFields = Object.keys(updates).filter(f => !allowedFields.includes(f));
    if (invalidFields.length > 0) throw new Error("FIELDS NOT UPDATABLE");

    // Validate updates
    const dataToValidate = {
      ...user.toObject(),
      ...updates,
      password: updates.password,
      rePassword: updates.password
    };
    validateUser(dataToValidate);

    // Apply updates
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

    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }


  // Get all patients
  static async getPatients() {
    const patients = await User.find({ role: "patient" })
      .select("name last_name1 last_name2 age email phone")
      .lean();

    return patients.map(({ password, ...u }) => u);
  }


  // Get all psychologists
  static async getPsychologists() {
    const psychologists = await User.find({ role: "psychologist" })
      .select("name last_name1 last_name2 age email phone specialty")
      .lean();

    return psychologists.map(({ password, ...u }) => u);
  }
}

module.exports = UserService;
