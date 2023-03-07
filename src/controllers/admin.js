const { adminService } = require('../services');

const createProduct = async (req, res) => {
  try {
    const nameOfProduct = req.body.name;
    const userId = req.userData.id;
    console.log(req.userData);
    const newProduct = await adminService.createProduct(nameOfProduct, userId);
    res.status(200).json({
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = { createProduct };