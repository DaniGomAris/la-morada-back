function handleError(res, err) {
  const ERROR_MAP = {
    // Errores de autenticación
    "Credenciales requeridas": { msg: "Credenciales requeridas", status: 400 },
    "Email inválido": { msg: "Email inválido", status: 400 },
    "Contraseña incorrecta": { msg: "Contraseña incorrecta", status: 401 },
    "No autorizado": { msg: "No autorizado", status: 403 },
    "Token inválido": { msg: "Token inválido o expirado", status: 401 },
    "Token requerido": { msg: "Token requerido", status: 401 },

    // Errores de registro o conflictos
    "Id ya registrado": { msg: "ID ya está en uso", status: 409 },
    "Email ya registrado": { msg: "Email ya está en uso", status: 409 },
    "Recurso ya existe": { msg: "El recurso ya existe", status: 409 },

    // Errores de permisos y acceso
    "Acceso denegado": { msg: "No tienes permisos para esta acción", status: 403 },

    // Errores de validación de datos
    "Parámetros inválidos": { msg: "Parámetros inválidos en la solicitud", status: 400 },
    "Id inválido": { msg: "Id inválido", status: 400 },
    "Tipo de documento inválido": { msg: "Tipo de documento inválido", status: 400 },
    "Nombre inválido": { msg: "Nombre inválido", status: 400 },
    "Primer apellido inválido": { msg: "Primer apellido inválido", status: 400 },
    "Segundo apellido inválido": { msg: "Segundo apellido inválido", status: 400 },
    "Edad inválida": { msg: "Edad inválida", status: 400 },
    "Contraseña inválida": { msg: "Contraseña inválida", status: 400 },
    "Teléfono inválido": { msg: "Teléfono inválido", status: 400 },
    "El patientID es obligatorio": { msg: "El patientID es obligatorio", status: 400 },
    "El psychologistID es obligatorio": { msg: "El psychologistID es obligatorio", status: 400 },
    "Estado de cita inválido": { msg: "Estado de cita inválido", status: 400 },
    "No se pueden actualizar los campos": { msg: "No se pueden actualizar algunos campos del usuario", status: 400 },

    // Errores de no encontrado
    "Usuario no encontrado": { msg: "Usuario no encontrado", status: 404 },
    "Cita no encontrada": { msg: "Cita no encontrada", status: 404 },
  };

  const { msg, status } = ERROR_MAP[err.message] || { msg: "Error interno del servidor", status: 500 };
  return res.status(status).json({ message: msg });
}

module.exports = { handleError };
