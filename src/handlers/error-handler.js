function handleError(res, err) {
  const ERROR_MAP = {
    "Credenciales requeridas": { msg: "Credenciales requeridas", status: 400 },
    "Email inválido": { msg: "Email inválido", status: 400 },
    "Contraseña incorrecta": { msg: "Contraseña incorrecta", status: 401 },
    "No autorizado": { msg: "No autorizado", status: 403 },
    "Id ya registrado": { msg: "ID ya esta en uso", status: 409 },
    "Email ya registrado": { msg: "Email ya esta en uso", status: 409 }
  };

  const { msg, status } = ERROR_MAP[err.message] || { msg: "Error interno", status: 500 };
  return res.status(status).json({ message: msg });
}

module.exports = { handleError };
