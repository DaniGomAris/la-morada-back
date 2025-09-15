const argon2 = require("argon2");

// Configuracion de seguridad
const argon2Options = {
  type: argon2.argon2id,
  timeCost: 3,              // Numero de iteraciones
  memoryCost: 2 ** 16,      // 64 MB
  parallelism: 2,           // Hilos
  hashLength: 32,           // Longitud
  saltLength: 16            // Longitud de la sal
};

// Genera un hash para la contraseña
async function hashPassword(password) {
  return await argon2.hash(password, argon2Options);
}


// Verifica si la contraseña coincide con el hash
async function verifyPassword(hashedPassword, plainPassword) {
  try {
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (err) {
    return false;
  }
}

module.exports = {
  hashPassword,
  verifyPassword
};
