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
      // req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjM1ODE5YWRjMDNhMWVkMWI5MzdjMyIsImlhdCI6MTY1MDY3ODI3NywiZXhwIjoxNjUzMjcwMjc3fQ.AJvskdgub1lHYRzLjh7cfBnz_hsFcqGvGIpEXfUtMdI',
      // so req.headers.authorization.split(' ') will return ['Bearer', <token>]
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get suer from token
      // attach user to req, keep everything for user except the password field
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
