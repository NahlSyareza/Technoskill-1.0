const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

router.post("/add", employeeController.addEmployee);
router.get("/get", employeeController.getEmployee);
router.get("/getAll", employeeController.getAllEmployee);
router.get("/search", employeeController.searchEmployee);

module.exports = router;
