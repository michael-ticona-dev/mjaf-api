const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let sensorData = {
    temp: 0,
    hum: 0
};

// recibir datos del ESP32
app.post("/api/sensor", (req, res) => {

    sensorData = req.body;

    console.log(sensorData);

    res.json({
        ok: true
    });
});

// obtener datos
app.get("/api/data", (req, res) => {

    res.json(sensorData);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor iniciado");
});