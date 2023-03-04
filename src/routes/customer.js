const express = require('express');
const router = express.Router();

const { customerController } = require('../controllers');

router.route('/create')
.post(customerController.createCustomer);

router.route('/login')
.post(customerController.loginCustomer);

module.exports = router;