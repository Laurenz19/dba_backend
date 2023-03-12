const { Router } = require("express")
const medecinController = require("../controllers/medecin.controller");
const { authenticateToken } = require("../middleware/authentication");
const router = Router();



router.get("/", authenticateToken, medecinController.getAllMedecins);
router.get("/:id", authenticateToken, medecinController.getMedecin);
router.post("/", authenticateToken, medecinController.createMedecin);
router.put("/:id", authenticateToken, medecinController.updateMedecin);
router.delete("/:id", authenticateToken, medecinController.deleteMedecin);

module.exports = router;
