const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// almacenamiento simple (RAM)
let latestData = {
  temp: null,
  hum: null,
  soil: null,
  time: null
};

// 🌐 HOME (importante para Railway)
app.get("/", (req, res) => {
  res.send("Sensor API running 🚀");
});

// 📡 recibir datos ESP32
app.post("/api/sensor", (req, res) => {
  const { temp, hum, soil } = req.body;

  latestData = {
    temp,
    hum,
    soil,
    time: new Date().toISOString()
  };

  console.log("📡 Datos recibidos:", latestData);

  res.json({ ok: true, data: latestData });
});

// 📊 ver últimos datos
app.get("/api/sensor", (req, res) => {
  res.json(latestData);
});

// ⚙️ PORT de Railway (CRÍTICO)
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Servidor corriendo en puerto:", PORT);
});