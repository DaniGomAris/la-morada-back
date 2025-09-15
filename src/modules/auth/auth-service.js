const User = require("../user/models/user");
const { validateLogin, validatePassword, validateRole } = require("./validators/auth-validator");
const { generateToken } = require("../../auth/jwt-auth");

async function loginUser(email, password) {
  validateLogin(email, password);

  // Buscar usuario en la base de datos
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuario no encontrado");

  await validatePassword(user.password, password);

  validateRole(user.role, ["patient", "psychologist"]);

  // Eliminar password para mostrarlo
  const { password: _, ...userWithoutPassword } = user.toObject();

  // Generar JWT
  const token = generateToken(user._id.toString(), user.role);

  // Datos seguros para enviar
  const safeUser = {
    _id: userWithoutPassword._id,
    email: userWithoutPassword.email,
    name: userWithoutPassword.name,
    role: userWithoutPassword.role
  };

  return { user: safeUser, token };
}

module.exports = { loginUser };
