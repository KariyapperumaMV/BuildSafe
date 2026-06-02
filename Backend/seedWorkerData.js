/* One-off seed script: realistic sensor data for worker helmet BS-H-001.
   Run:  node seedWorkerData.js   (from the Backend folder)            */

require("dotenv").config({ path: "./config/config.env" });
const mongoose = require("mongoose");
const HelmetData = require("./models/HelmetData");

const HELMET_ID = "BS-H-001";

// Colombo-ish construction site coordinates.
const GPS = { lat: 6.9271, lng: 79.8612 };

const rnd = (min, max) => Math.round((min + Math.random() * (max - min)) * 10) / 10;

// Classify a single sensor reading (mirrors frontend SensorUtils).
const classify = {
  gas: (v) => (v < 150 ? "safe" : v <= 300 ? "warning" : "critical"),
  ambient: (v) => (v < 27 ? "safe" : v <= 35 ? "warning" : "critical"),
  uv: (v) => (v < 3 ? "safe" : v <= 8 ? "warning" : "critical"),
  sound: (v) => (v < 85 ? "safe" : v <= 95 ? "warning" : "critical"),
  heart: (v) =>
    v >= 88 && v <= 149 ? "safe" : (v > 149 && v <= 175) || (v < 88 && v >= 85) ? "warning" : "critical",
  body: (v) =>
    v >= 35 && v <= 38 ? "safe" : (v > 38 && v <= 39) || (v < 35 && v >= 30) ? "warning" : "critical",
};

const buildReading = (timestamp) => {
  const sensors = {
    gas_ppm: rnd(40, 130),
    ambient_temp: rnd(26, 32),
    body_temp: rnd(36.2, 37.4),
    heart_rate: rnd(88, 120),
    uv_index: rnd(2, 6),
    noise_db: rnd(60, 84),
    gps: GPS,
  };

  const checks = {
    gas: classify.gas(sensors.gas_ppm),
    ambient: classify.ambient(sensors.ambient_temp),
    uv: classify.uv(sensors.uv_index),
    sound: classify.sound(sensors.noise_db),
    heart: classify.heart(sensors.heart_rate),
    body: classify.body(sensors.body_temp),
  };

  const critical_sensors = Object.keys(checks).filter((k) => checks[k] === "critical");
  const warning_sensors = Object.keys(checks).filter((k) => checks[k] === "warning");

  const overall = critical_sensors.length
    ? "CRITICAL"
    : warning_sensors.length
    ? "WARNING"
    : "SAFE";

  return {
    helmetId: HELMET_ID,
    timestamp,
    sensors,
    status: { overall, critical_sensors, warning_sensors },
  };
};

const run = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connected.");

  // Clear existing data for this helmet so the seed is coherent.
  const del = await HelmetData.deleteMany({ helmetId: HELMET_ID });
  console.log(`Removed ${del.deletedCount} old records for ${HELMET_ID}.`);

  const docs = [];
  const now = Date.now();

  // 7 days of history: 8 readings per day across daytime hours.
  for (let day = 6; day >= 0; day--) {
    for (let i = 0; i < 8; i++) {
      const ts = new Date(now - day * 24 * 60 * 60 * 1000);
      ts.setHours(8 + i, 0, 0, 0); // 08:00 .. 15:00
      docs.push(buildReading(ts));
    }
  }

  // A healthy, current "latest" reading (a few minutes ago).
  const latest = buildReading(new Date(now - 3 * 60 * 1000));
  latest.sensors = {
    gas_ppm: 62,
    ambient_temp: 26.5,
    body_temp: 36.8,
    heart_rate: 94,
    uv_index: 2,
    noise_db: 71,
    gps: GPS,
  };
  latest.status = { overall: "SAFE", critical_sensors: [], warning_sensors: [] };
  docs.push(latest);

  await HelmetData.insertMany(docs);
  console.log(`Inserted ${docs.length} realistic records for ${HELMET_ID}.`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
