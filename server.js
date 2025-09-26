const app = require("./src/app");
const PORT = process.env.PORT;

// Initialize server
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
