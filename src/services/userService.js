const User = require("../models/user");
const { db } = require("../config/firebase");
const { validateUser } = require("../validations/userValidation");

class UserService {
  static async registerUser(data) {
    validateUser(data);

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

  static async login(email, password) {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) throw new Error("Usuario no encontrado");

    let user;
    snapshot.forEach(doc => (user = { id: doc.id, ...doc.data() }));

    if (user.password !== password) throw new Error("Contraseña incorrecta");

    return { message: "Inicio de sesión exitoso", user };
  }

  static async getUsers() {
    const snapshot = await db.collection("users").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = UserService;
