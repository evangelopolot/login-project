const express = require("express");
const loginController = require(`../controllers/loginController`);

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.route("/").get(loginController.signIn);
router.route("/signIn").get(loginController.signIn);
router.route("/signUp").get(loginController.signUp);
router.route("/getAllUsers").get(loginController.getAllUsers);
router.route("/api/data").post(loginController.login);
router.route("/create-user").post(loginController.createUser);

module.exports = router;
