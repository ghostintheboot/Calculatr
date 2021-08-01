// Not needed anymore.
const mongoose = require('mongoose');



const CalcSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  calculation: {
    type: Number,
    maxLength: [21, "Calculation is too long!"],
    required: true
  },
  notes: {
    type: String,
    trim: true,
    maxLength: 200
  }
});



module.exports = mongoose.model('CalcData', CalcSchema);