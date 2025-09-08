const admin = require("firebase-admin");
require("dotenv").config();
const path = require("path");

let serviceAccountPath = path.resolve(process.env.FIREBASE_KEY_PATH || "./src/config/firebase_key.json");

// Local / comentar esta linea si se usa en produccion
// const serviceAccount = require(serviceAccountPath);

// Produccion / descomentar esta linea si se usa en produccion
const serviceAccount = require("/etc/secrets/firebase_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };
