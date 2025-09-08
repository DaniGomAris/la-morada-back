// Modelo de datos para un usuario
class User {
  constructor(email, name, last_name1, last_name2, age, password, role, phone) {
    this.email = email;
    this.name = name;
    this.last_name1 = last_name1;
    this.last_name2 = last_name2;
    this.age = age;
    this.password = password;
    this.role = role || "patient";
    this.phone = phone;
    this.createdAt = new Date();
  }

  // Convierte el usuario a un objeto plano para la base de datos
  toDict() {
    return {
      email: this.email,
      name: this.name,
      last_name1: this.last_name1,
      last_name2: this.last_name2,
      age: this.age,
      password: this.password,
      role: this.role,
      phone: this.phone,
      createdAt: this.createdAt,
    };
  }
}

module.exports = User;
