const { Router } = require("express");
const router = Router();
const traitementController = require("../controllers/traitement.controller");

router
    .get("/", traitementController.getAllTraitements)
    .get("/:id", traitementController.getTraitement)
    .post("/", traitementController.createTraitement)
    .put("/:id", traitementController.updateTraitement)
    .delete("/:id", traitementController.deleteTraitement);

module.exports = router;