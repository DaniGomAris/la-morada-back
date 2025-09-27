const STATUS = require("../handlers/status-handler");

function handleError(res, err) {
  const ERROR_MAP = {
    // Authentication errors
    "MISSING CREDENTIALS": { msg: "Credenciales faltantes", status: STATUS.BAD_REQUEST },
    "INVALID EMAIL": { msg: "Correo electrónico inválido", status: STATUS.BAD_REQUEST },
    "WRONG PASSWORD": { msg: "Contraseña incorrecta", status: STATUS.UNAUTHORIZED },
    "UNAUTHORIZED": { msg: "No autorizado", status: STATUS.FORBIDDEN },
    "INVALID TOKEN": { msg: "Token inválido o expirado", status: STATUS.UNAUTHORIZED },
    "TOKEN REQUIRED": { msg: "Se requiere un token", status: STATUS.UNAUTHORIZED },

    // Appointment errors
    "PATIENTID REQUIRED": { msg: "Se requiere el ID del paciente", status: STATUS.BAD_REQUEST },
    "PSYCHOLOGISTID REQUIRED": { msg: "Se requiere el ID del psicólogo", status: STATUS.BAD_REQUEST },
    "INVALID STATUS": { msg: "Estado inválido", status: STATUS.BAD_REQUEST },
    "APPOINTMENT NOT FOUND": { msg: "Cita no encontrada", status: STATUS.NOT_FOUND },
    "TIME ALREADY BOOKED": { msg: "Ya existe una cita en este horario", status: STATUS.BAD_REQUEST },
    "PSYCHOLOGIST NOT AVAILABLE AT THIS TIME": { msg: "El psicólogo no está disponible en este horario", status: STATUS.BAD_REQUEST },
    "DATE MUST BE IN THE FUTURE": { msg: "La fecha debe ser futura", status: STATUS.BAD_REQUEST },
    "DAY NOT AVAILABLE": { msg: "El psicólogo no atiende ese día", status: STATUS.BAD_REQUEST },

    // Availability errors
    "DATA INCOMPLETE": { msg: "Faltan campos requeridos", status: STATUS.BAD_REQUEST },
    "DAYS AND SLOTS MUST MATCH": { msg: "Los días y los horarios deben coincidir en cantidad", status: STATUS.BAD_REQUEST },
    "AVAILABILITY NOT FOUND": { msg: "Disponibilidad no encontrada", status: STATUS.NOT_FOUND },

    // Conflict / registration
    "ID EXISTS": { msg: "ID ya en uso", status: STATUS.CONFLICT },
    "EMAIL EXISTS": { msg: "Correo electrónico ya en uso", status: STATUS.CONFLICT },
    "RESOURCE EXISTS": { msg: "Recurso ya existe", status: STATUS.CONFLICT },

    // Permissions
    "ACCESS DENIED": { msg: "Acceso denegado", status: STATUS.FORBIDDEN },
    "USER NOT FOUND OR NOT PSYCHOLOGIST": { msg: "Usuario no encontrado o no es psicólogo", status: STATUS.FORBIDDEN },

    // Validation errors
    "INVALID PARAMS": { msg: "Parámetros inválidos", status: STATUS.BAD_REQUEST },
    "INVALID ID": { msg: "ID inválido", status: STATUS.BAD_REQUEST },
    "INVALID DOC TYPE": { msg: "Tipo de documento inválido", status: STATUS.BAD_REQUEST },
    "INVALID NAME": { msg: "Nombre inválido", status: STATUS.BAD_REQUEST },
    "INVALID LASTNAME1": { msg: "Primer apellido inválido", status: STATUS.BAD_REQUEST },
    "INVALID LASTNAME2": { msg: "Segundo apellido inválido", status: STATUS.BAD_REQUEST },
    "INVALID AGE": { msg: "Edad inválida", status: STATUS.BAD_REQUEST },
    "INVALID PASSWORD": { msg: "Contraseña inválida", status: STATUS.BAD_REQUEST },
    "INVALID PHONE": { msg: "Teléfono inválido", status: STATUS.BAD_REQUEST },
    "FIELDS NOT UPDATABLE": { msg: "Algunos campos no se pueden actualizar", status: STATUS.BAD_REQUEST },

    // Not found
    "USER NOT FOUND": { msg: "Usuario no encontrado", status: STATUS.NOT_FOUND },
    "POST NOT FOUND": { msg: "Post no encontrado", status: STATUS.NOT_FOUND },

    // Product errors
    "INVALID TITLE": { msg: "Título inválido", status: STATUS.BAD_REQUEST },
    "INVALID AUTHOR": { msg: "Autor inválido", status: STATUS.BAD_REQUEST },
    "INVALID PUBLISH_YEAR": { msg: "Año de publicación inválido", status: STATUS.BAD_REQUEST },
    "INVALID PRICE": { msg: "Precio inválido", status: STATUS.BAD_REQUEST },
    "INVALID COVER_URL": { msg: "URL de portada inválida", status: STATUS.BAD_REQUEST },
    "PRODUCT NOT FOUND": { msg: "Producto no encontrado", status: STATUS.NOT_FOUND },
    "PRODUCT EXISTS": { msg: "El producto ya existe", status: STATUS.CONFLICT },

    // Cart errors
    "CART NOT FOUND": { msg: "Carrito no encontrado", status: STATUS.NOT_FOUND },
    "INVALID PRODUCT_ID": { msg: "ID de producto inválido", status: STATUS.BAD_REQUEST },
    "INVALID QUANTITY": { msg: "Cantidad inválida", status: STATUS.BAD_REQUEST },

    // Podcast errors
    "INVALID YOUTUBE ID": { msg: "ID de YouTube inválido", status: STATUS.BAD_REQUEST },
    "INVALID DESCRIPTION": { msg: "Descripción inválida", status: STATUS.BAD_REQUEST },
    "USER NOT FOUND OR NOT PSYCHOLOGIST": { msg: "Usuario no encontrado o no es psicólogo", status: STATUS.FORBIDDEN },
  };

  const { msg, status } =
    ERROR_MAP[err.message?.toUpperCase?.()] || { msg: "Error interno del servidor", status: STATUS.INTERNAL_SERVER_ERROR };

  return res.status(status).json({ message: msg });
}

module.exports = { handleError };
