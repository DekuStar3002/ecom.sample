const { User, Cart, Product } = require('../../database/models');
const { passwordUtil, redisUtil } = require('../utils');
const jwt = require('jsonwebtoken');

const createCustomer = async ({ name, email, password }) => {
  const hashedPassword = await passwordUtil.hashPassword(password);
  const cart = await Cart.create({ product_list: [] });
  return User.create({
    name,
    email,
    type: 'customer',
    password: hashedPassword,
    cart_id: cart.id,
  });
}

const loginCustomer = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  console.log(user);
  if(user) {
    const checkPassword = await passwordUtil.comparePassword(password, user.password);
    if(checkPassword) {
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email, type: 'customer', cart_id: user.cart_id }, process.env.JWT_SECRET);
      await redisUtil.setToRedisStore(user.id, 'customer', token);
      return { token: `Bearer ${token}` };
    } else {
      throw new Error('Wrong password entered');
    }
  } else {
    throw new Error(`No user found with email ${email}`);
  }
}

const getAllProduct = async () => {
  return Product.findAll({ attributes: ['name'] });
}

const addProductToCart = async (productName, userData) => {
  console.log(productName);
  const product = Product.findOne({ where: { name: productName }});
  if(!product)
    throw new Error(`Product ${productName} not present!`);
  const userCart = await Cart.findOne({ where: { id: userData.cart_id } });
  console.log(userCart);
  if(!userCart)
    throw new Error(`Cart with cart_id:${cart_id} not found`)
  const product_list = userCart.product_list;
  product_list.push(product.id);
  return Cart.update({ product_list: product_list }, { where: { id: userData.cart_id } });
}

module.exports = { createCustomer, loginCustomer, getAllProduct, addProductToCart };