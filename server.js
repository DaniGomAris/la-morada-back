const app = require("./src/app");

const PORT = process.env.PORT || 5000;

const EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`You can access your API at: ${EXTERNAL_URL}`);
});
