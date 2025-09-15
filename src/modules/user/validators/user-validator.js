function validateUser(data) {
  // Id
  const idRegex = /^[0-9]{1,15}$/;
  if (!idRegex.test(String(data._id))) throw new Error("Id inválido");

  // Tipo de documento
  const document_type = ["CC", "CE", "NIT"];
  if (!document_type.includes(data.document_type)) throw new Error("Tipo de documento inválido");

  // Email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
  if (!emailRegex.test(data.email)) throw new Error("Email inválido");

  // Nombre
  const nameRegex = /^[a-zA-Z\s]{1,50}$/;
  if (!nameRegex.test(data.name)) throw new Error("Nombre inválido");

  // Apellidos
  const lastNameRegex = /^[a-zA-Z\s]{1,50}$/;
  if (!data.last_name1 || !lastNameRegex.test(data.last_name1)) throw new Error("Primer apellido inválido");
  if (!data.last_name2 || !lastNameRegex.test(data.last_name2)) throw new Error("Segundo apellido inválido");

  // Edad
  const age = Number(data.age);
  if (isNaN(age) || age < 1 || age > 120) throw new Error("Edad inválida");

  // Contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
  if (!passwordRegex.test(data.password)) throw new Error("Contraseña inválida");

  // Teléfono
  const phoneRegex = /^[0-9]{7,15}$/;
  if (!phoneRegex.test(data.phone)) throw new Error("Teléfono inválido");
}

module.exports = { validateUser };
