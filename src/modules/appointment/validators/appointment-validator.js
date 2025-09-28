const User = require("../../user/models/user");
const Availability = require("../../availability/models/availability");

const VALID_STATUSES = ["pendiente", "cancelada", "completada"];

function isValidDate(date) {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) && parsed > new Date();
}

async function validateAppointment(data) {
  if (!data.patient_id) throw new Error("PATIENTID REQUIRED");
  if (!data.psychologist_id) throw new Error("PSYCHOLOGISTID REQUIRED");

  const patient = await User.findById(data.patient_id);
  if (!patient) throw new Error("INVALID PATIENT");
  if (patient.role !== "patient") throw new Error("INVALID PATIENT ROLE");

  const psychologist = await User.findById(data.psychologist_id);
  if (!psychologist) throw new Error("INVALID PSYCHOLOGIST");
  if (psychologist.role !== "psychologist") throw new Error("INVALID PSYCHOLOGIST ROLE");

  if (!data.start || !isValidDate(data.start)) throw new Error("INVALID START DATE");

  const availability = await Availability.findById(psychologist.availability_id);
  if (!availability) throw new Error("PSYCHOLOGIST HAS NO AVAILABILITY");

  const startDate = new Date(data.start);
  const dayName = startDate.toLocaleDateString("es-ES", { weekday: "long" }).toLowerCase();

  if (!availability.days.includes(dayName)) {
    throw new Error("DAY NOT AVAILABLE");
  }

  const startHour = startDate.getHours();
  const startMinutes = startDate.getMinutes();

  const slotMatch = availability.slots.some(slot => {
    const [slotStartH, slotStartM] = slot.start.split(":").map(Number);
    const [slotEndH, slotEndM] = slot.end.split(":").map(Number);

    const slotStartTotal = slotStartH * 60 + slotStartM;
    const slotEndTotal = slotEndH * 60 + slotEndM;
    const appointmentStartTotal = startHour * 60 + startMinutes;
    const appointmentEndTotal = appointmentStartTotal + 60;

    return appointmentStartTotal >= slotStartTotal && appointmentEndTotal <= slotEndTotal;
  });

  if (!slotMatch) throw new Error("TIME NOT AVAILABLE IN SLOT");

  if (data.status && !VALID_STATUSES.includes(data.status.toLowerCase())) {
    throw new Error("INVALID STATUS");
  }
}

module.exports = { validateAppointment };
