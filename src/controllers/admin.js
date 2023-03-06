const { adminService } = require('../services');

const createAdmin = async (req, res) => { 
  try {
    const newUser = await adminService.createAdmin({ ...req.body });
    res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
}

const loginAdmin = async (req, res) => {
  try {
    const token = await adminService.loginAdmin({ ...req.body });
    res.status(200).json({
      data: token
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

const createProduct = async (req, res) => {
  try {
    const nameOfProduct = req.body.name;
    const userId = req.userData.id;
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

module.exports = { createAdmin, loginAdmin, createProduct };