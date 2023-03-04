const { User, Cart, Product } = require('../../database/models');
const { passwordUtil, redisUtil } = require('../utils');
const jwt = require('jsonwebtoken');

const createAdmin = async ({ name, email, password }) => {
  const hashedPassword = await passwordUtil.hashPassword(password);
  const cart = await Cart.create({ product_list: [] });
  return User.create({
    name,
    email,
    type: 'admin',
    password: hashedPassword,
    cart_id: cart.id,
  });
};

const loginAdmin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  if(user) {
    const checkPassword = await passwordUtil.comparePassword(password, user.password);
    if(checkPassword) {
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email, type: 'admin' }, process.env.JWT_SECRET);
      await redisUtil.setToRedisStore(user.id, 'admin', token);
      return { token: `Bearer ${token}` };
    } else {
      throw new Error('Wrong password entered');
    }
  } else {
    throw new Error(`No user found with email ${email}`);
  }
};

const createProduct = async ({ name, user_id }) => {
  return Product.create({ name: name, user_id: user_id });
}

module.exports = { createAdmin, loginAdmin, createProduct };