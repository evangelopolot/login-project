const express = require('express')
const loginController = require('./../controllers/loginController')

const router = express.Router();


router.route('/').get(loginController.greet)
router.route('/api/data').get(loginController.storeLogin)

module.exports = router;