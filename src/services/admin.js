const { Product } = require('../../database/models');

const createProduct = async (name, user_id) => {
  return Product.create({ name: name, user_id: user_id });
}

module.exports = { createProduct };