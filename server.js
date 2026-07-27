const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Replace with your API key
const API_KEY = "0058263185e828d73ce9f876fa7ca93e";

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to fetch weather
app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = response.data;

        // Extract time and temperature
        const result = data.list.map(item => ({
            time: item.dt_txt,
            temp: item.main.temp,
        }));

        res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Unable to fetch weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

