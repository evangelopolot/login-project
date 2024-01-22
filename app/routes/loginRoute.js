const express = require("express");
const loginController = require(`../controllers/loginController`);
const authController = require(`../controllers/authController`);
const userController = require(`./../controllers/userController`);
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.get("/getAllUsers", authController.protect, authController.restrictTo('admin'), userController.getAllUsers);

router.route("/").get(loginController.homepage);
router.route("/signIn").get(loginController.signIn);
router.route("/").get(loginController.getAllUsers);
router.route("/login").post(loginController.login);
router.route("/create-user").post(loginController.createUser);

module.exports = router;
