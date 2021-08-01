/*2️⃣*/
const crypto = require('crypto');
const User = require('../models/User.js');
const ErrorResponse = require('../utils/errorResponse.js');
const sendEmail = require('../utils/sendEmail.js');



const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token
  });
}



exports.register = async (req, res, next) => {
  const { email, password } = req.body; // Destructuring.

  try {
    const user = await User.create({
      email, password
    });
    // res.status(201).json({ success: true, user });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
}



exports.login = async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return next( new ErrorResponse("Invalid email or password.", 400));
  }

  try {
    const user = await User.findOne({email}).select('+password');
    if (!user) {
      return next( new ErrorResponse("Invalid credentials.", 404));
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next( new ErrorResponse("Invalid credentials.", 401));
    }
    // res.status(200).json({ success: true, token: "f97y9a7ff9fyfha9hf1u8f1jf9fn403o" });
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}



exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return next( new ErrorResponse("Email not in database.", 404)); 
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
      <h2>Password Reset Request</h2>
      <p>Click link below to reset password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message
      });

      res.status(200).json({
        success: true,
        data: "Email with token sent."
      });
    } catch (error) {
      this.resetPasswordToken = undefined;
      this.resetPasswordExpires = undefined;
      await user.save();
      return next(new ErrorResponse('Email failed to be sent.', 500));
    }
  } catch (error) {
    next(error);
  }
}



exports.resetpassword = async (req, res, next) => {
  // Crypto token...
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  // User...
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(new ErrorResponse('Invalid reset token.', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(201).json({
      success: true,
      data: "Password reset successful."
    });
  } catch (error) {
    next(error);
  }
}