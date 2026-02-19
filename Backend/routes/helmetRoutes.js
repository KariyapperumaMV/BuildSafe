const express = require("express");
const router = express.Router();

const {
  receiveHelmetData,
  receiveHelmetEmergencyData,
  sendHelmetResetCommand,
  getHelmetCommand
} = require("../controllers/helmetController");

router.post("/data", receiveHelmetData);
router.post("/emergency", receiveHelmetEmergencyData);

// Admin actions
router.post("/reset", sendHelmetResetCommand);

// Helmet polling
router.get("/commands/:helmetId", getHelmetCommand);

module.exports = router;
