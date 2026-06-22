const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 📦 Datos del sensor (memoria)
let sensorData = {
    temp: 0,
    hum: 0,
    soil: 0,
    time: null
};

// 🔥 RECIBIR DATOS DEL ESP32
app.post("/api/sensor", (req, res) => {
    try {
        const { temp, hum, soil } = req.body;

        // Validación básica
        if (temp === undefined || hum === undefined || soil === undefined) {
            return res.status(400).json({
                ok: false,
                message: "Faltan datos"
            });
        }

        sensorData = {
            temp: Number(temp),
            hum: Number(hum),
            soil: Number(soil),
            time: new Date().toISOString()
        };

        console.log("📡 Datos recibidos:", sensorData);

        res.json({
            ok: true,
            message: "Datos guardados"
        });

    } catch (error) {
        console.error("Error POST /api/sensor:", error);
        res.status(500).json({
            ok: false,
            message: "Error interno"
        });
    }
});

// 📊 OBTENER DATOS (WEB / HTML)
app.get("/api/data", (req, res) => {
    res.json({
        ok: true,
        data: sensorData
    });
});

// 🟢 TEST API
app.get("/", (req, res) => {
    res.send("Sensor API funcionando 🚀");
});

// 🚀 PORT RAILWAY
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 Servidor iniciado en puerto:", PORT);
});