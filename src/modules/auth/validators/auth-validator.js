const argon2 = require("argon2");

// Valida email y password de login
function validateLogin(email, password) {
  if (!email || !password) throw new Error("Credenciales requeridas");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
  if (!emailRegex.test(email)) throw new Error("Email invalido");

  return true;
}

// Valida si la contraseña ingresada coincide con el hash almacenado
async function validatePassword(hash, plainPassword) {
  const isValid = await argon2.verify(hash, plainPassword);
  if (!isValid) throw new Error("Contrasena incorrecta");
  return true;
}

// Valida si el rol del usuario está permitido
function validateRole(userRole, allowedRoles) {
  if (!allowedRoles.includes(userRole)) throw new Error("No autorizado");
  return true;
}

module.exports = {
  validateLogin,
  validatePassword,
  validateRole
};
