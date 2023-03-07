const express = require('express');
const router = express.Router();

const { customerController } = require('../controllers');
const { userMiddleware, validateUser } = require('../middlewares');

router.route('/products')
.get(validateUser, customerController.getAllProduct);

router.route('/add-to-cart')
.post(validateUser, userMiddleware.customerChecker, customerController.addProductToCart);

module.exports = router;