const app = require("./src/app");
const PORT = process.env.PORT;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
