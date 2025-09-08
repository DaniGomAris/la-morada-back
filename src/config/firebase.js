const admin = require("firebase-admin");
require("dotenv").config();
const path = require("path");

// Determina la ruta segun .env
// - production, ruta del servidor (/etc/secrets/firebase_key.json)
// - local, variable de entorno FIREBASE_KEY_PATH
const serviceAccountPath =
  process.env.NODE_ENV === "production"
    ? "/etc/secrets/firebase_key.json" 
    : path.resolve(process.env.FIREBASE_KEY_PATH); 

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Instancia de Firestore para usar en otros modulos
const db = admin.firestore();

module.exports = { admin, db };
