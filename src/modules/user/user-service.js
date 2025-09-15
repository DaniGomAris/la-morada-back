const User = require("./models/user");
const { validateUser } = require("./validators/user-validator");
const { hashPassword } = require("../../auth/password-auth");

// Registra un nuevo usuario
async function registerUser(data) {
  validateUser(data);

  // Verificar si ID ya eciste
  const existingById = await User.findById(data._id);
  if (existingById) throw new Error("Id ya registrado");

  // Verificar si email ya eciste
  const existingByEmail = await User.findOne({ email: data.email });
  if (existingByEmail) throw new Error("Email ya registrado");

  // Hashear contraseña
  const hashedPassword = await hashPassword(data.password);

  const user = new User({
    ...data,
    password: hashedPassword,
    role: "patient",
  });

  await user.save();

  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

// Obtiene todos los usuarios con rol "patient".
async function getUsers() {
  const users = await User.find({ role: "patient" }).lean();
  return users.map(({ password, ...u }) => u);
}

// Editar un usuario existente.
async function updateUser(userId, updates) {
  const user = await User.findById(userId);
  if (!user) throw new Error("Usuario no encontrado");

  // Campos que se pueden actualizar
  const allowedFields = ["name", "last_name1", "last_name2", "email", "phone", "age", "password"];


  const invalidFields = Object.keys(updates).filter(field => !allowedFields.includes(field));
  if (invalidFields.length > 0) throw new Error("No se pueden actualizar los campos");

  // Validar datos de valores actuales y nuevos
  const dataToValidate = {
    ...user.toObject(),
    ...updates,
    password: updates.password,
    rePassword: updates.password
  };
  validateUser(dataToValidate);

  // Actualizar campos permitidos
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

  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

module.exports = {
  registerUser,
  getUsers,
  updateUser,
};
