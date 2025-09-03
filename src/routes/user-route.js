const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const docRef = await db.collection("users").add({ nombre, email });
    res.status(201).json({ id: docRef.id, nombre, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar usuarios
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
