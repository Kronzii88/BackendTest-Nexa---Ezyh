const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/api/v1/login", adminController.handleLogin);

module.exports = router;
