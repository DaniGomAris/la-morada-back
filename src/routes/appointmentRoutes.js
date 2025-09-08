const express = require("express");
const AppointmentController = require("../controllers/appointmentController");
const validateAppointmentMiddleware = require("../middlewares/appointmentMiddleware");

const router = express.Router();

router.post("/", validateAppointmentMiddleware, AppointmentController.create);
router.get("/", AppointmentController.getAll);
router.get("/:userId", AppointmentController.getByUser);
router.put("/:id", AppointmentController.update);
router.delete("/:id", AppointmentController.delete);

module.exports = router;
