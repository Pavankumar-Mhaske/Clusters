const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  return res.json({
    message: `hellow from Express Server ${process.pid} 🚀`,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
