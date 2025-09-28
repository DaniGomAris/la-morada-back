const Appointment = require("./models/appointment");
const User = require("../user/models/user");
const Availability = require("../availability/models/availability");
const logger = require("../../utils/logger");

class AppointmentService {

  // Add one hour to a given time (HH:mm)
  static addOneHour(time) {
    const [hour, min] = time.split(":").map(Number);
    let newHour = hour + 1;
    if (newHour >= 24) newHour -= 24;
    return `${newHour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  }

  // Create appointment
  static async createAppointment(data) {
    try {
      // Validate patient and psychologist
      const patient = await User.findById(data.patient_id);
      const psychologist = await User.findById(data.psychologist_id);
      if (!patient || patient.role !== "patient") throw new Error("INVALID PATIENT");
      if (!psychologist || psychologist.role !== "psychologist") throw new Error("INVALID PSYCHOLOGIST");

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

      const overlapping = await Appointment.findOne({
        psychologist_id: data.psychologist_id,
        day: dayOfWeek,
        start: { $lt: endHour },
        end: { $gt: startHour }
      });
      if (overlapping) throw new Error("TIME ALREADY BOOKED");

      const appointment = new Appointment({
        patient_id: data.patient_id,
        psychologist_id: data.psychologist_id,
        day: dayOfWeek,
        start: startHour,
        end: endHour,
        status: "pendiente"
      });

      await appointment.save();
      logger.info(`Appointment created: ${appointment._id} for patient ${data.patient_id}`);
      return appointment;

    } catch (err) {
      logger.error(`Create appointment failed: ${err.message}`);
      throw err;
    }
  }

  // Update appointment status
  static async updateAppointmentStatus(appointmentId, user, newStatus) {
    try {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) throw new Error("APPOINTMENT NOT FOUND");

      const allowedStatuses = ["pendiente", "confirmada", "completada", "cancelada"];
      if (!allowedStatuses.includes(newStatus)) throw new Error("INVALID STATUS");

      if (user.role === "patient") {
        if (["confirmada", "completada"].includes(newStatus)) throw new Error("ACCESS DENIED");
        if (appointment.status === "completada") throw new Error("CANNOT CHANGE COMPLETED APPOINTMENT");
      }

      if (user.role === "psychologist") {
        if (appointment.status === "cancelada") throw new Error("CANNOT CHANGE CANCELLED APPOINTMENT");
        if (appointment.status === "completada" && newStatus !== "completada") {
          throw new Error("CANNOT REOPEN COMPLETED APPOINTMENT");
        }
      }

      appointment.status = newStatus;
      await appointment.save();
      logger.info(`Appointment ${appointment._id} status updated to ${newStatus}`);
      return appointment;

    } catch (err) {
      logger.error(`Update appointment failed: ${err.message}`);
      throw err;
    }
  }

  // Delete appointment
  static async deleteAppointment(id) {
    try {
      const appointment = await Appointment.findByIdAndDelete(id);
      if (!appointment) throw new Error("APPOINTMENT NOT FOUND");
      logger.info(`Appointment deleted: ${id}`);
      return appointment;
    } catch (err) {
      logger.error(`Delete appointment failed: ${err.message}`);
      throw err;
    }
  }

  // Get all appointments by patient
  static async getAppointmentsByPatient(patient_id) {
    try {
      const appointments = await Appointment.find({ patient_id }).sort({ start: 1 });
      logger.info(`Retrieved ${appointments.length} appointments for patient ${patient_id}`);
      return appointments;
    } catch (err) {
      logger.error(`Get appointments by patient failed: ${err.message}`);
      throw err;
    }
  }

  static async getAppointmentsByPsychologist(psychologist_id) {
    try {
      const appointments = await Appointment.find({ psychologist_id }).sort({ start: 1 });
      logger.info(`Retrieved ${appointments.length} appointments for psychologist ${psychologist_id}`);
      return appointments;
    } catch (err) {
      logger.error(`Get appointments by psychologist failed: ${err.message}`);
      throw err;
    }
  }
}

module.exports = AppointmentService;
