const argon2 = require("argon2");
const User = require("./models/user");
const { validateUser } = require("./validators/user-validator");

// Registrar usuario
async function registerUser(data) {
  // Validar todos los campos
  validateUser(data);

  // Verificar duplicados
  const existingById = await User.findById(data._id);
  if (existingById) throw new Error("Id ya registrado");

  const existingByEmail = await User.findOne({ email: data.email });
  if (existingByEmail) throw new Error("Email ya registrado");

  // Hashear contraseña
  const hashedPassword = await argon2.hash(data.password);

  const user = new User({
    ...data,
    password: hashedPassword,
    role: "patient", // rol por defecto
  });

  await user.save();
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

// Obtener todos los usuarios
async function getUsers() {
  const users = await User.find().lean();
  return users.map(({ password, ...u }) => u);
}

// Actualizar usuario
async function updateUser(userId, updates) {
  const user = await User.findById(userId);
  if (!user) throw new Error("Usuario no encontrado");

  // Validar datos combinando los actuales y los nuevos
  const dataToValidate = {
    ...user.toObject(),
    ...updates,
    password: updates.password || "Aa1!aaaa",
    rePassword: updates.password || "Aa1!aaaa"
  };
  validateUser(dataToValidate);

  // Campos permitidos
  const allowedFields = ["name", "last_name1", "last_name2", "email", "phone", "age", "password"];
  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      if (field === "password") {
        user.password = await argon2.hash(updates.password); // <--- aquí
      } else {
        user[field] = updates[field];
      }
    }
  }

  await user.save();
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

module.exports = {
  registerUser,
  getUsers,
  updateUser,
};
