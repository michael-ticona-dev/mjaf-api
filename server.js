const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let sensorData = {
    temp: 0,
    hum: 0,
    soil: 0
};

// Recibir datos del ESP32
app.post("/api/sensor", (req, res) => {

    const { temp, hum, soil } = req.body;

    sensorData = {
        temp,
        hum,
        soil
    };

    console.log("📡 Datos recibidos:", sensorData);

    res.json({
        ok: true
    });
});

// Obtener últimos datos
app.get("/api/data", (req, res) => {
    res.json(sensorData);
});

// Ruta principal
app.get("/", (req, res) => {
    res.send("Sensor API funcionando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
});