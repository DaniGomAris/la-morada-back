const argon2 = require("argon2");
const User = require("./models/user");
const { validateUser } = require("./validators/user-validator");

async function registerUser(data) {
  validateUser(data);

  // Verificar si ya existe un usuario con el mismo _id
  const existingById = await User.findById(data._id);
  if (existingById) throw new Error("Id ya registrado");

  // Verificar si ya existe un usuario con el mismo email
  const existingByEmail = await User.findOne({ email: data.email });
  if (existingByEmail) throw new Error("Email ya registrado");

  // Hashear contraseña
  const hashedPassword = await argon2.hash(data.password);

  const user = new User({
    ...data,
    password: hashedPassword,
    role: "user",
  });

  await user.save();
  return user.toObject();
}

async function getUsers() {
  const users = await User.find().lean();
  return users.map(({ password, ...u }) => u);
}

module.exports = {
  registerUser,
  getUsers,
};
