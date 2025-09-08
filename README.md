# La Morada Backend

Backend de la aplicación **La Morada**, que gestiona usuarios y citas (appointments) usando **Node.js**, **Express** y **Firebase Firestore**.

---

## 📦 Tecnologías

* Node.js
* Express
* Firebase Admin SDK (Firestore)
* dotenv
* JavaScript (ES6+)

---

## ⚙️ Configuración

1. Clona el repositorio:

```bash
git clone <tu-repo-url>
cd <tu-repo>
```

2. Instala dependencias:

```bash
npm install
```

3. Configura las variables de entorno creando un archivo `.env` en la raíz:

```env
# / local / para desarrollo local
# / production / para despliegue en producción
NODE_ENV=development

FIREBASE_KEY_PATH=firebase_key.json
```

> Para producción, cambia `NODE_ENV=production` y asegúrate de tener el archivo de credenciales en `/etc/secrets/firebase_key.json`.

4. Inicializa Firebase y Firestore en `src/config/firebase.js` (ya configurado con lógica de entorno).

---

## 🚀 Ejecutar la API

```console
node server.js
```

* Por defecto corre en `http://localhost:5000`.
* Puedes cambiar el puerto con la variable de entorno `PORT`.

---

## 📝 Rutas de la API

### Usuarios

| Método | Ruta                | Descripción                                                                    |
| ------ | ------------------- | ------------------------------------------------------------------------------ |
| POST   | /api/users/register | Registrar usuario (solo psychologist o admin)                                  |
| POST   | /api/users/login    | Iniciar sesión                                                                 |
| GET    | /api/users          | Obtener usuarios según rol (psychologist ve pacientes, admin ve psychologists) |

### Citas (Appointments)

| Método | Ruta                       | Descripción                                         |
| ------ | -------------------------- | --------------------------------------------------- |
| POST   | /api/appointments          | Crear nueva cita                                    |
| GET    | /api/appointments          | Obtener todas las citas (filtrado por rol y userId) |
| GET    | /api/appointments/\:userId | Obtener citas de un usuario específico              |
| PUT    | /api/appointments/\:id     | Actualizar cita (solo psychologist)                 |
| DELETE | /api/appointments/\:id     | Eliminar cita                                       |

---

## 🧪 Validaciones

* Los usuarios y citas se validan mediante middlewares antes de guardarlos en Firestore.
* Citas: fecha futura, paciente y psicólogo válidos.
* Usuarios: email, nombres, edad, rol y teléfono correctos.

---

## 📁 Estructura de carpetas

```
src/
├─ config/
│  └─ firebase.js
├─ controllers/
│  ├─ appointmentController.js
│  └─ userController.js
├─ models/
│  ├─ appointment.js
│  └─ user.js
├─ routes/
│  ├─ appointmentRoutes.js
│  └─ userRoutes.js
├─ services/
│  ├─ appointmentService.js
│  └─ userService.js
├─ validations/
│  ├─ appointmentValidation.js
│  └─ userValidation.js
├─ middlewares/
│  ├─ appointmentMiddleware.js
│  └─ userMiddleware.js
└─ app.js
```
