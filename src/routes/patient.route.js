const { Router } = require("express");
const router = Router();
const patientController = require("../controllers/patient.controller");

router
    .get("/", patientController.getAllPatients)
    .get("/:id", patientController.getPatient)
    .post("/", patientController.createPatient)
    .put("/:id", patientController.updatePatient)
    .delete("/:id", patientController.deletePatient);

module.exports = router;