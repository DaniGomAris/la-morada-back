const Appointment = require("./models/appointment");
const User = require("../user/models/user-model");
const Availability = require("../availability/models/availability");

class AppointmentService {
  // Add one hour to given time (HH:mm)
  static addOneHour(time) {
    const [hour, min] = time.split(":").map(Number);
    let newHour = hour + 1;
    if (newHour >= 24) newHour -= 24;
    return `${newHour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  }

  // Create appointment
  static async createAppointment(data) {
    // Validate patient and psychologist
    const patient = await User.findById(data.patient_id);
    const psychologist = await User.findById(data.psychologist_id);
    if (!patient || patient.role !== "patient") throw new Error("INVALID PATIENT");
    if (!psychologist || psychologist.role !== "psychologist") throw new Error("INVALID PSYCHOLOGIST");

    // Check psychologist availability
    const availability = await Availability.findById(psychologist.availability_id);
    if (!availability) throw new Error("PSYCHOLOGIST HAS NO AVAILABILITY");

    // Validate date (must be in the future)
    const appointmentDate = new Date(data.start);
    if (appointmentDate <= new Date()) throw new Error("DATE MUST BE IN THE FUTURE");

    // Check if the day is available
    const dayOfWeek = appointmentDate.toLocaleDateString("es-CO", { weekday: "long" }).toLowerCase();
    if (!availability.days.map(d => d.toLowerCase()).includes(dayOfWeek)) {
      throw new Error("DAY NOT AVAILABLE");
    }

    // Check if the time fits a slot
    const startHour = appointmentDate.getHours().toString().padStart(2, "0") + ":00";
    const endHour = this.addOneHour(startHour);
    const validSlot = availability.slots.find(slot =>
      startHour >= slot.start && endHour <= slot.end
    );
    if (!validSlot) throw new Error("TIME NOT AVAILABLE IN SLOT");

    // Prevent overlapping appointments
    const overlapping = await Appointment.findOne({
      psychologist_id: data.psychologist_id,
      day: dayOfWeek,
      start: { $lt: endHour },
      end: { $gt: startHour }
    });
    if (overlapping) throw new Error("TIME ALREADY BOOKED");

    // Save appointment
    const appointment = new Appointment({
      patient_id: data.patient_id,
      psychologist_id: data.psychologist_id,
      day: dayOfWeek,
      start: startHour,
      end: endHour,
      status: "pendiente"
    });

    await appointment.save();
    return appointment;
  }


  // Update appointment status
  static async updateAppointmentStatus(appointmentId, user, newStatus) {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new Error("APPOINTMENT NOT FOUND");

    const allowedStatuses = ["pendiente", "confirmada", "completada", "cancelada"];
    if (!allowedStatuses.includes(newStatus)) throw new Error("INVALID STATUS");

    // Patients cannot confirm/complete
    if (user.role === "patient") {
      if (["confirmada", "completada"].includes(newStatus)) {
        throw new Error("ACCESS DENIED");
      }
      if (appointment.status === "completada") throw new Error("CANNOT CHANGE COMPLETED APPOINTMENT");
    }

    // Psychologists restrictions
    if (user.role === "psychologist") {
      if (appointment.status === "cancelada") throw new Error("CANNOT CHANGE CANCELLED APPOINTMENT");
      if (appointment.status === "completada" && newStatus !== "completada") {
        throw new Error("CANNOT REOPEN COMPLETED APPOINTMENT");
      }
    }

    appointment.status = newStatus;
    await appointment.save();
    return appointment;
  }


  // Delete appointment
  static async deleteAppointment(id) {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) throw new Error("APPOINTMENT NOT FOUND");
    return appointment;
  }


  // Get all appointments by patient
  static async getAppointmentsByPatient(patient_id) {
    return await Appointment.find({ patient_id }).sort({ start: 1 });
  }

  
  // Get all appointments by psychologist
  static async getAppointmentsByPsychologist(psychologist_id) {
    return await Appointment.find({ psychologist_id }).sort({ start: 1 });
  }
}

module.exports = AppointmentService;
