const express = require('express')
const loginController = require(`/Users/evangelopolot/Documents/Projects/login-project/app/controllers/loginController.js`)

const router = express.Router();

router.route('/').get(loginController.homepage)
router.route('/signIn').get(loginController.signIn)
router.route('/api/data').post(loginController.login)

module.exports = router;