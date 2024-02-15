const express = require("express");
const viewController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");
const router = express.Router();

// Test
// router.get("/", viewController.getBase);

// Place the isLoggedIn middleware in here, so that every request hits this middleware
router.use(authController.isLoggedIn);

router.get("/", viewController.getOverview);
router.get("/password-reset", viewController.getPasswordReset);
router.get("/sign-up", viewController.getSignUp);
router.get("/dashboard", viewController.getDashboard);
router.get("/tour", viewController.getTour);
router.get("/login", viewController.getLogin);

module.exports = router;
