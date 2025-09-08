const express = require("express");
const AppointmentController = require("../controllers/appointmentController");
const validateAppointmentMiddleware = require("../middlewares/appointmentMiddleware");

const router = express.Router();

// Crear una nueva cita 
// Validar los datos de la cita con el middleware
router.post("/", validateAppointmentMiddleware, AppointmentController.create);

// Obtener todas las citas (solo psychologist)
router.get("/", AppointmentController.getAll);

// Obtener citas por usuario (solo psychologist)
router.get("/:userId", AppointmentController.getByUser);

// Actualizar citas
router.put("/:id", AppointmentController.update);

// Eliminar cita existente (solo psychologist)
router.delete("/:id", AppointmentController.delete);


module.exports = router;
