const { db } = require("../config/firebase");
const User = require("../models/user");
const Appointment = require("../models/appointment");
const { validateAppointment } = require("../validations/appointmentValidation");

// Servicio para manejar la logica de citas
class AppointmentService {


  // Crear una nueva cita
  static async createAppointment(data) {
    validateAppointment(data);

    // Obtiene ID de paciente y psicologo en Firestore
    const patientRef = await db.collection("users").doc(data.patientID).get();
    const psychologistRef = await db.collection("users").doc(data.psychologistID).get();

    // Verifica existencia de los usuarios
    if (!patientRef.exists) throw new Error("El paciente no existe");
    if (!psychologistRef.exists) throw new Error("El psicólogo no existe");

    // Obtiene datos de los usuarios
    const patient = new User({ id: patientRef.id, ...patientRef.data() });
    const psychologist = new User({ id: psychologistRef.id, ...psychologistRef.data() });

    // Verifica roles de los usuarios
    if (!["patient", "admin"].includes(patient.role)) {
      throw new Error("El usuario no tiene permitido agendar citas");
    }
    if (psychologist.role !== "psychologist") {
      throw new Error("El profesional debe ser psicólogo");
    }

    // Crea una instancia del modelo Appointment
    const appointment = new Appointment({
      patientID: data.patientID,
      psychologistID: data.psychologistID,
      date: new Date(data.date),
      status: data.status || "pendiente",
      notes: data.notes || "",
    });

    // Guarda la cita en Firestore
    const ref = db.collection("appointments").doc();
    appointment.id = ref.id;
    await ref.set(appointment.toDict());

    return appointment.toDict();
  }


  // Obtener todas las citas
  static async getAppointments() {
    const snapshot = await db.collection("appointments").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }


  // Obtener citas por usuario (paciente o psicólogo)
  static async getAppointmentsByUser(userId, role) {
    let query = db.collection("appointments");

    // Filtra la consulta segun el rol del usuario
    if (role === "psychologist") query = query.where("psychologistID", "==", userId);
    else if (role === "patient") query = query.where("patientID", "==", userId);

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }


  // Actualizar citas existentes
  static async updateAppointment(id, data) {
    const ref = db.collection("appointments").doc(id);

    // Obtiene la cita actual
    const doc = await ref.get();
    if (!doc.exists) throw new Error("La cita no existe");

    // Valida los datos a actualizar
    const updates = {};
    if (data.date) updates.date = new Date(data.date);
    if (data.status) updates.status = data.status;
    if (data.notes) updates.notes = data.notes;

    // Aplica las actualizaciones
    await ref.update(updates);

    // Obtiene la cita actualizada
    const updatedDoc = await ref.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }


  // Eliminar una cita
  static async deleteAppointment(id) {
    const ref = db.collection("appointments").doc(id);

    // Verifica si la cita existe
    const doc = await ref.get();
    if (!doc.exists) throw new Error("La cita no existe");

    // Elimina la cita de firestore
    await ref.delete();
    return { message: "Cita eliminada correctamente" };
  }
}

module.exports = AppointmentService;
