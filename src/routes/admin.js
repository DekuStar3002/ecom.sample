const express = require('express');
const { userMiddleware, validateUser } = require('../middlewares');
const router = express.Router();

const { adminController } = require('../controllers');

router.route('/add-product')
.post(validateUser, userMiddleware.adminChecker, adminController.createProduct);

module.exports = router;