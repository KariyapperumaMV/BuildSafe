const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Add user
router.post("/", userController.addUser);

module.exports = router;
