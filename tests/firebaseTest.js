const { db } = require("../src/config/firebase");

async function testFirestore() {
  try {
    const docRef = db.collection("tests").doc("testDoc");
    await docRef.set({ message: "Conexión exitosa", timestamp: new Date() });

    const doc = await docRef.get();
    console.log("Documento leído:", doc.data());
  } catch (error) {
    console.error("Error probando Firestore:", error);
  }
}

testFirestore();
