const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// almacenamiento simple
let latestData = {
  temp: null,
  hum: null,
  soil: null,
  time: null
};

// recibir datos ESP32
app.post("/api/sensor", (req, res) => {
  const { temp, hum, soil } = req.body;

  latestData = {
    temp,
    hum,
    soil,
    time: new Date()
  };

  console.log("📡 Datos:", latestData);

  res.json({ ok: true });
});

// ver datos
app.get("/api/sensor", (req, res) => {
  res.json(latestData);
});

// home
app.get("/", (req, res) => {
  res.send("Sensor API running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor en puerto", PORT);
});