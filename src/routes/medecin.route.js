const { Router } = require("express")
const medecinController = require("../controllers/medecin.controller");
const router = Router();

router
    .get("/", medecinController.getAllMedecins)
    .get("/:id", medecinController.getMedecin)
    .post("/", medecinController.createMedecin)
    .put("/:id", medecinController.updateMedecin)
    .delete("/:id", medecinController.deleteMedecin);

module.exports = router;
