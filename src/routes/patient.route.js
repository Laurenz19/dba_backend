const { Router } = require("express");
const router = Router();
const patientController = require("../controllers/patient.controller");
const { authenticateToken } = require("../middleware/authentication");


router
    .get("/", authenticateToken, patientController.getAllPatients)
    .get("/:id", authenticateToken, patientController.getPatient)
    .post("/", authenticateToken, patientController.createPatient)
    .put("/:id", authenticateToken, patientController.updatePatient)
    .delete("/:id", authenticateToken, patientController.deletePatient);

module.exports = router;