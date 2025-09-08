const User = require("../models/user");
const { db } = require("../config/firebase");
const { validateUser } = require("../validations/userValidation");

class UserService {

  // Registrar un nuevo usuario
  static async registerUser(data) {
    validateUser(data);

    // Crea una instancia del modelo User
    const user = new User(
      data.email,
      data.name,
      data.last_name1,
      data.last_name2,
      data.age,
      data.password,
      data.role,
      data.phone
    );

    const docRef = await db.collection("users").add(user.toDict());
    return { message: "Usuario registrado con éxito", userId: docRef.id };
  }


  // Iniciar sesion
  static async login(email, password) {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) throw new Error("Usuario no encontrado");

    // Obtiene datos del usuario
    let user;
    snapshot.forEach(doc => (user = { id: doc.id, ...doc.data() }));

    // Verifica la contraseña
    if (user.password !== password) throw new Error("Contraseña incorrecta");

    return { message: "Inicio de sesión exitoso", user };
  }

  // Obtiene todos los usuarios
  static async getUsers() {
    const snapshot = await db.collection("users").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = UserService;
