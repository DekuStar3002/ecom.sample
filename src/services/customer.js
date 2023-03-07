const { Cart, Product } = require('../../database/models');

const getAllProduct = async () => {
  return Product.findAll({ attributes: ['name'] });
}

const addProductToCart = async (productName, userData) => {
  const product = Product.findOne({ where: { name: productName }});
  if(!product)
    throw new Error(`Product ${productName} not present!`);
  let userCart = await Cart.findOne({ where: { user_id: userData.id } });
  if(!userCart)
    userCart = await Cart.create({ product_list: [], user_id: userData.id });
  const product_list = userCart.product_list;
  product_list.push(product.id);
  return Cart.update({ product_list: product_list }, { where: { user_id: userData.id } });
}

module.exports = { getAllProduct, addProductToCart };