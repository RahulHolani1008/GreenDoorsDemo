const express = require("express");
const calculationsController = require("../controllers/calculations");
const router = express.Router();

router.post('/rentSchedule', calculationsController.getMonthlyRent);

module.exports = router;