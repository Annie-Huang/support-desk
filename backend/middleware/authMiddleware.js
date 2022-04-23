const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      // req.headers.authorization = 'Bearer Token', so req.headers.authorization.split(' ') will return ['Bearer', 'Token']
      console.log('req.headers.authorization=', req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
      console.log('token=', token);
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get suer from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
});
