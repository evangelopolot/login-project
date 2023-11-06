const express = require('express')
const loginController = require('../controllers/loginController')

const router = express.Router();

router.route('/').get(loginController.signIn)
router.route('/login').get(loginController.login)
router.route('/api/data').post(loginController.login)

module.exports = router;