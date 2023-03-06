const express = require('express');
const { userMiddleware } = require('../middlewares');
const router = express.Router();

const { adminController } = require('../controllers');

router.route('/create')
.post(adminController.createAdmin);

router.route('/login')
.post( adminController.loginAdmin);

router.route('/add-product')
.post(userMiddleware.authorizeUser, userMiddleware.adminChecker, adminController.createProduct);

module.exports = router;