import { UpdateDB } from "../databaseManager.js";
import { Router } from "express";
import getWeather from "../weather.js";
import XRay from "x-ray";

const x = XRay();
const router = Router();

router.get("/get-weather", async (req, res) => {
  const { city } = req.query;
  try {
    const data = await getWeather(city);
    const waterTemp = await x(
      "https://seatemperature.info/lake-simcoe-water-temperature.html",
      ".s38"
    );
    data.waterTemp = waterTemp;
    res.json({ data });
  } catch (err) {
    res.json({ data: "error" });
  }
});

router.get("/get-updates", async (req, res) => {
  const result = await UpdateDB.find({}).toArray();
  result.sort((a, b) => b.sortDate - a.sortDate);
  res.json({ data: result });
});

export default router;
