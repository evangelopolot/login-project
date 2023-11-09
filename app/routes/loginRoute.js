const express = require('express')
const loginController = require(`/Users/evangelopolot/Documents/Projects/login-project/app/controllers/loginController.js`)

const router = express.Router();

router.route('/').get(loginController.signIn)
router.route('/login').get(loginController.signIn)
router.route('/api/data').post(loginController.login)

module.exports = router;