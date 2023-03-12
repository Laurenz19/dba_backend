const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller")
const { authenticateToken } = require("../middleware/authentication");


router.get('/users', authenticateToken, userController.getAllUsers)
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", authenticateToken, userController.logout);
router.get("/profile", userController.profile);
router.get("/refreshToken", authenticateToken, userController.refreshToken);


module.exports = router;