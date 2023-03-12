const { Router } = require("express");
const router = Router();
const traitementController = require("../controllers/traitement.controller");
const { authenticateToken } = require("../middleware/authentication");

router
    .get("/", authenticateToken, traitementController.getAllTraitements)
    .get("/:id", authenticateToken, traitementController.getTraitement)
    .post("/", authenticateToken, traitementController.createTraitement)
    .put("/:id", authenticateToken, traitementController.updateTraitement)
    .delete("/:id", authenticateToken, traitementController.deleteTraitement);

module.exports = router;