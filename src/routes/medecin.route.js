const { Router } = require("express")
const medecinController = require("../controllers/medecin.controller");
const { authenticateToken } = require("../middleware/authentication");
const router = Router();

router
    .get("/", authenticateToken, medecinController.getAllMedecins)
    .get("/:id", authenticateToken, medecinController.getMedecin)
    .post("/", authenticateToken, medecinController.createMedecin)
    .put("/:id", authenticateToken, medecinController.updateMedecin)
    .delete("/:id", authenticateToken, medecinController.deleteMedecin);

module.exports = router;
