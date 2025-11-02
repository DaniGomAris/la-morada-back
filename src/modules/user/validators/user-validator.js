function validateUser(data) {
  const idRegex = /^[0-9]{1,15}$/;
  if (!idRegex.test(String(data._id))) throw new Error("INVALID ID");

  const document_type = ["CC", "CE", "NIT"];
  if (!document_type.includes(data.document_type)) throw new Error("INVALID DOC TYPE");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
  if (!emailRegex.test(data.email)) throw new Error("INVALID EMAIL");

  const nameRegex = /^(?=.{1,30}$)[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:[ '\-][a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
  if (!nameRegex.test(data.name)) throw new Error("INVALID NAME");

  const lastNameRegex = /^(?=.{1,30}$)[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:[ '\-][a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
  if (!data.last_name1 || !lastNameRegex.test(data.last_name1)) throw new Error("INVALID LASTNAME1");
  if (!data.last_name2 || !lastNameRegex.test(data.last_name2)) throw new Error("INVALID LASTNAME2");

  const age = Number(data.age);
  if (isNaN(age) || age < 5 || age > 110) throw new Error("INVALID AGE");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
  if (!passwordRegex.test(data.password)) throw new Error("INVALID PASSWORD");

  const phoneRegex = /^[0-9]{7,15}$/;
  if (!phoneRegex.test(data.phone)) throw new Error("INVALID PHONE");
}

module.exports = { validateUser };
