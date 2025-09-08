const admin = require("firebase-admin");
require("dotenv").config();
const path = require("path");

// Determina la ruta del archivo de credenciales de Firebase
// - En local se usa la variable de entorno FIREBASE_KEY_PATH
// - En producción se usa la ruta segura del servidor (/etc/secrets/firebase_key.json)
const serviceAccountPath =
  process.env.NODE_ENV === "production"
    ? "/etc/secrets/firebase_key.json"
    : path.resolve(process.env.FIREBASE_KEY_PATH);

// Carga las credenciales
const serviceAccount = require(serviceAccountPath);

// Inicializa Firebase Admin con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Instancia de Firestore exportable para usar en otros módulos
const db = admin.firestore();

module.exports = { admin, db };
