const customerChecker = (req, res, next) => {
  try {
    const userData = req.userData;
    if(userData.type !== 'customer') {
      res.status(400).json({
        message: 'not valid user'
      });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const adminChecker = (req, res, next) => {
  try {
    const userData = req.userData;
    if(userData.type !== 'admin') {
      res.status(400).json({
        message: 'not valid user'
      });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { customerChecker, adminChecker };