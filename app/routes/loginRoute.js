const express = require('express')
const loginController = require(`./../controllers/loginController`)

const router = express.Router();

router.route('/').get(loginController.homepage)
router.route('/signIn').get(loginController.signIn)
router.route('/signUp').get(loginController.signUp)
router.route('/api/data').post(loginController.login)
router.route('/create-user').post(loginController.createUser)

module.exports = router;