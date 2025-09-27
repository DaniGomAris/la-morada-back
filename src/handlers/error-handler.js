function handleError(res, err) {
  const ERROR_MAP = {

    // Errores de autenticación
    "MISSING CREDENTIALS": { msg: "Credenciales faltantes", status: 400 },
    "INVALID EMAIL": { msg: "Correo electrónico inválido", status: 400 },
    "WRONG PASSWORD": { msg: "Contraseña incorrecta", status: 401 },
    "UNAUTHORIZED": { msg: "No autorizado", status: 403 },
    "INVALID TOKEN": { msg: "Token inválido o expirado", status: 401 },
    "TOKEN REQUIRED": { msg: "Se requiere un token", status: 401 },

    // Errores de citas
    "PATIENTID REQUIRED": { msg: "Se requiere el ID del paciente", status: 400 },
    "PSYCHOLOGISTID REQUIRED": { msg: "Se requiere el ID del psicólogo", status: 400 },
    "INVALID STATUS": { msg: "Estado inválido", status: 400 },
    "APPOINTMENT NOT FOUND": { msg: "Cita no encontrada", status: 404 },
    "TIME ALREADY BOOKED": { msg: "Ya existe una cita en este horario", status: 400 },
    "PSYCHOLOGIST NOT AVAILABLE AT THIS TIME": { msg: "El psicólogo no está disponible en este horario", status: 400 },
    "DATE MUST BE IN THE FUTURE": { msg: "La fecha debe ser futura", status: 400 },
    "DAY NOT AVAILABLE": { msg: "El psicólogo no atiende ese día", status: 400 },

    // Errores de disponibilidad
    "DATA INCOMPLETE": { msg: "Faltan campos requeridos", status: 400 },
    "DAYS AND SLOTS MUST MATCH": { msg: "Los días y los horarios deben coincidir en cantidad", status: 400 },
    "AVAILABILITY NOT FOUND": { msg: "Disponibilidad no encontrada", status: 404 },

    // Conflictos / registro
    "ID EXISTS": { msg: "ID ya en uso", status: 409 },
    "EMAIL EXISTS": { msg: "Correo electrónico ya en uso", status: 409 },
    "RESOURCE EXISTS": { msg: "Recurso ya existe", status: 409 },

    // Permisos
    "ACCESS DENIED": { msg: "Acceso denegado", status: 403 },

    // Validaciones
    "INVALID PARAMS": { msg: "Parámetros inválidos", status: 400 },
    "INVALID ID": { msg: "ID inválido", status: 400 },
    "INVALID DOC TYPE": { msg: "Tipo de documento inválido", status: 400 },
    "INVALID NAME": { msg: "Nombre inválido", status: 400 },
    "INVALID LASTNAME1": { msg: "Primer apellido inválido", status: 400 },
    "INVALID LASTNAME2": { msg: "Segundo apellido inválido", status: 400 },
    "INVALID AGE": { msg: "Edad inválida", status: 400 },
    "INVALID PASSWORD": { msg: "Contraseña inválida", status: 400 },
    "INVALID PHONE": { msg: "Teléfono inválido", status: 400 },
    "FIELDS NOT UPDATABLE": { msg: "Algunos campos no se pueden actualizar", status: 400 },

    // No encontrado
    "USER NOT FOUND": { msg: "Usuario no encontrado", status: 404 },
  };

  const { msg, status } = ERROR_MAP[err.message?.toUpperCase?.()] || { msg: "Error interno del servidor", status: 500 };
  return res.status(status).json({ message: msg });
}

module.exports = { handleError };
