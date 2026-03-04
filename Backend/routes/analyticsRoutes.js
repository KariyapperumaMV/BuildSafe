const express = require("express");
const router = express.Router();

const {
  getTodayAnalytics
} = require("../controllers/analyticsController");

router.get("/today", getTodayAnalytics);

module.exports = router;