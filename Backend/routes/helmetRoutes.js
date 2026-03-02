const express = require("express");
const router = express.Router();

const {
  receiveHelmetData,
  receiveHelmetEmergencyData,
  sendHelmetResetCommand,
  getHelmetCommand,
  getAvailableHelmets,
  getLatestHelmetData
} = require("../controllers/helmetController");

// Recieve normal datapacket
router.post("/data", receiveHelmetData);

// Recieve emergency data packet
router.post("/emergency", receiveHelmetEmergencyData);

// Admin actions
router.post("/reset", sendHelmetResetCommand);

// Helmet polling
router.get("/command/:helmetId", getHelmetCommand);

// Get available helmets - for the dropdown box
router.get("/available", getAvailableHelmets);

// Get recent helmet data
router.get("/latest/:helmetId", getLatestHelmetData);

module.exports = router;
