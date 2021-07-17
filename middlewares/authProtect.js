const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');



exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Bearer a1b2c3d4e5 <- You want the second part.
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to handle this route.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new ErrorResponse('No user found with this ID.', 404));
    }

    req.user = currentUser; // "on the request object we want to set that user"
    next();
  } catch (error) {
    return next(new ErrorResponse('Unauthorized to handle this route.', 401));
  }
}