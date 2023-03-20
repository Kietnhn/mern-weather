import express from "express";
const router = express.Router();
import fetch from "node-fetch";

// /api/weather
router.get("/", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon)
        return res.status(400).json({
            success: false,
            message: "latitude and longtude is required",
        });
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
        ).then((res) => res.json());
        res.json({ success: true, message: "Success", weather: response });
    } catch (error) {
        console.log(error);
    }
});
// /api/weather/history
router.get("/history", async (req, res) => {
    const { lat, lon, start, end, type } = req.query;

    try {
        const response = await fetch(
            `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=${type}`
        ).then((res) => res.json());
        if (response.error) {
            res.json({ success: false, message: response.reason });
        }
        res.json({ success: true, message: "Success", data: response });
    } catch (error) {
        console.log(error);
    }
});
export default router;
