const express = require('express');
const router = express.Router();

const { customerController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.route('/create')
.post(customerController.createCustomer);

router.route('/login')
.post(customerController.loginCustomer);

router.route('/products')
.get(customerController.getAllProduct);

router.route('/add-to-cart')
.post(userMiddleware.authorizeUser, userMiddleware.customerChecker, customerController.addProductToCart);

module.exports = router;