function handleError(res, err) {
  const ERROR_MAP = {
    // Auth errors
    "MISSING CREDENTIALS": { msg: "Missing credentials", status: 400 },
    "INVALID EMAIL": { msg: "Invalid email", status: 400 },
    "WRONG PASSWORD": { msg: "Wrong password", status: 401 },
    "UNAUTHORIZED": { msg: "Unauthorized", status: 403 },
    "INVALID TOKEN": { msg: "Invalid or expired token", status: 401 },
    "TOKEN REQUIRED": { msg: "Token required", status: 401 },

    // Conflict / register errors
    "ID EXISTS": { msg: "ID already in use", status: 409 },
    "EMAIL EXISTS": { msg: "Email already in use", status: 409 },
    "RESOURCE EXISTS": { msg: "Resource already exists", status: 409 },

    // Permission errors
    "ACCESS DENIED": { msg: "Access denied", status: 403 },

    // Validation errors
    "INVALID PARAMS": { msg: "Invalid request params", status: 400 },
    "INVALID ID": { msg: "Invalid ID", status: 400 },
    "INVALID DOC TYPE": { msg: "Invalid document type", status: 400 },
    "INVALID NAME": { msg: "Invalid name", status: 400 },
    "INVALID LASTNAME1": { msg: "Invalid first last name", status: 400 },
    "INVALID LASTNAME2": { msg: "Invalid second last name", status: 400 },
    "INVALID AGE": { msg: "Invalid age", status: 400 },
    "INVALID PASSWORD": { msg: "Invalid password", status: 400 },
    "INVALID PHONE": { msg: "Invalid phone", status: 400 },
    "PATIENTID REQUIRED": { msg: "PatientID required", status: 400 },
    "PSYCHOLOGISTID REQUIRED": { msg: "PsychologistID required", status: 400 },
    "INVALID STATUS": { msg: "Invalid status", status: 400 },
    "FIELDS NOT UPDATABLE": { msg: "Some fields can't be updated", status: 400 },

    // Not found
    "USER NOT FOUND": { msg: "User not found", status: 404 },
    "APPOINTMENT NOT FOUND": { msg: "Appointment not found", status: 404 },
  };

  const { msg, status } = ERROR_MAP[err.message?.toUpperCase?.()] || { msg: "Internal server error", status: 500 };
  return res.status(status).json({ message: msg });
}

module.exports = { handleError };
