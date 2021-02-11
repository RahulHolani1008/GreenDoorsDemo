const express = require("express");
const router = express.Router();

router.all('*', (req, res, next) => {
    res.status(404).send("Route not found")
});

module.exports = router;