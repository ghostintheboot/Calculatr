const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    maxLength: [80, "Email is too long. Consider using a shorter email."],
    required: [true, "Please enter your email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address."
    ]
  },
  password: {
    type: String,
    trim: true,
    minLength: [6, "Password is too short."],
    maxLength: [100, "Password is too long!"],
    required: [true, "Password is required."],
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});



// Password Encryption.
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 🧂 🧂 🧂
  const salt = await bcrypt.genSalt(11);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



// Password Match.
UserSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password);
}



// JSON Web Token.
UserSchema.methods.getSignedToken = function() {
  return jwt.sign(
    { id: this._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES }
  );
}



// Forgot Password.
UserSchema.methods.getResetPasswordToken = function() {
  // Random hash.
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Password encryption.
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Token expiration.
  this.resetPasswordExpires = Date.now() + (10 * 60 * 1000);

  return resetToken;
}



const User = mongoose.model('User', UserSchema);

module.exports = User;