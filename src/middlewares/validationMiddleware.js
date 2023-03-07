const axios = require('axios');

const validateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if(!token) {
      res.status(400).json({
        message: 'Unauthorized User(token error)'
      });
      return;
    }
    const response = await axios({
      baseURL: 'http://localhost:5005',
      url: 'api/user/validate',
      headers: {
        authorization: token
      }
    });
    if(response.status !== 200) {
      res.status(response.status).json({
        message: response.error
      });
      return;
    }
    req.userData = response.data.data;
    next();
  } catch (error) {
    res.status(error.response.status).json({
      error: error.response.userData
    });
    return;
  }
};

module.exports = validateUser;