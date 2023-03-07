const { customerService } = require('../services');

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await customerService.getAllProduct();
    res.status(200).json({
      data: allProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const productName = req.body.product;
    const userData = req.userData;
    const addedProduct = await customerService.addProductToCart(productName, userData);
    res.status(200).json({
      data: addedProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = { getAllProduct, addProductToCart };