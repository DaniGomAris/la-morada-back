// Modelo de datos para una cita
class Appointment {
  constructor({ id, patientID, psychologistID, date, status = "pendiente", createdAt = new Date(), notes = "" }) {
    this.id = id;
    this.patientID = patientID;
    this.psychologistID = psychologistID;
    this.date = date;
    this.status = status;
    this.createdAt = createdAt;
    this.notes = notes;
  }

  // Convierte la cita a un objeto plano para la base de datos
  toDict() {
    return {
      patientID: this.patientID,
      psychologistID: this.psychologistID,
      date: this.date,
      status: this.status,
      createdAt: this.createdAt,
      notes: this.notes,
    };
  }
}

module.exports = Appointment;
