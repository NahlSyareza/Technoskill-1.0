const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.get("/getAll", managerController.getAllManager);
router.get("/login", managerController.loginManager);
router.post("/register", managerController.registerManager);
router.get("/search", managerController.searchManager);

module.exports = router;
