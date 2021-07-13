/*6️⃣*/
const ErrorResponse = require('../utils/ErrorResponse.js');



const errorHandler = (err, req, res, next) => {
  let error = {...err};
  error.message = err.message;

  // console.log('📁middlewares/error.js📁, err: ', err);

  if (err.code === 11000) {
    const errMsg = 'Duplicate field value.';
    error = new ErrorResponse(errMsg, 400);
  }

  if (err.name === 'ValidationError') {
    // This error usually returns nested objects.
    // Take that obj and make an arr from it, then add the messages to msg var.
    const errMsg = Object
      .values(err.error)
      .map(val => val.message);
    error = new ErrorResponse(errMsg, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
}



module.exports = errorHandler;