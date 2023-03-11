const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/profile", userController.profile);
router.get("/refreshToken", userController.refreshToken);
module.exports = router;