const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
const nameRegex = /^[a-zA-Z]+$/;
const ageRegex = /^[0-9]{1,2}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
const phoneRegex = /^[0-9]{7,15}$/;
const roles = ["patient", "psychologist", "admin"];

function validateUser(data) {
  if (!emailRegex.test(data.email)) throw new Error("Email inválido");
  if (!nameRegex.test(data.name)) throw new Error("Nombre inválido");
  if (!nameRegex.test(data.last_name1)) throw new Error("Primer apellido inválido");
  if (!nameRegex.test(data.last_name2)) throw new Error("Segundo apellido inválido");
  if (!ageRegex.test(data.age)) throw new Error("Edad inválida");
  if (!passwordRegex.test(data.password)) throw new Error("Contraseña inválida");
  if (!phoneRegex.test(data.phone)) throw new Error("Teléfono inválido");

  if (!roles.includes(data.role || "patient")) {
    throw new Error("Rol inválido");
  }
}

module.exports = { validateUser };
