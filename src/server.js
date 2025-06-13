const express = require("express");
const path = require("path");
const { printRawText } = require("./print");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.post("/print", async (req, res) => {
  try {
    const { text } = req.body;
    await printRawText(text);
    res.send({ status: "success" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
