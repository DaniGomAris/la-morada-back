const argon2 = require("argon2");

// Email y password de login
function validateLogin(email, password) {
  if (!email || !password) throw new Error("Credenciales requeridas");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
  if (!emailRegex.test(email)) throw new Error("Email invalido");

  return true;
}

// Valida al contraseña con el hash de la base de datos
async function validatePassword(hash, plainPassword) {
  const isValid = await argon2.verify(hash, plainPassword);
  if (!isValid) throw new Error("Contrasena incorrecta");
  return true;
}

// Valida si el usuario tiene rol
function validateRole(userRole, allowedRoles) {
  if (!allowedRoles.includes(userRole)) throw new Error("No autorizado");
  return true;
}

module.exports = {
  validateLogin,
  validatePassword,
  validateRole
};
