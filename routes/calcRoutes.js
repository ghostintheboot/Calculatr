const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authProtect');
const { check, validationResult } = require('express-validator')



// CalcSchema Model.
const CalcData = require('../models/CalcData');

// @route Get /calcs
// @des Get calcs
// @access Private
router.get('/', protect, async (req, res) => {
  try {
    const calcs = await CalcData.find({ user: req.user.id });
    res.json(calcs);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});



// @route POST /calc
// @des Add new calc
// @access Private
router.post('/',
  [
    protect,
    [
      check('calculation', 'Please provide the calculation').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { calculation, notes } = req.body;

    try {
      let newCalc = new CalcData({
        user: req.user.id,
        calculation,
        notes
      });

      const calc = await newCalc.save();
      res.json(calc);
    } catch (err) {
      console.error(err.message)
      res.status(500).send('500 server error')
    }
  });



// @route PUT /calcs/:id
// @des update guest
// @access Private
// router.put('/:id', protect, async (req, res) => {
//   const { name, phone, diet, isconfirmed } = req.body

//   // build Calc object 
//   const guestFields = { name, phone, diet, isconfirmed };

//   try {
//     let guest = await Calc.findById(req.params.id)
//     if (!guest) return res.status(404).json({ msg: 'Calc not found' })
//     // Make sure user owns the guest
//     if (guest.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorised' })
//     }
//     guest = await Calc.findByIdAndUpdate(req.params.id, { $set: guestFields }, { new: true })
//     res.send(guest)
//   } catch (err) {
//     console.errors(err.message)
//     res.status(500).send('Server Error')
//   }
// })



// @route DELETE /calcs/:id
// @des Delete a guest
// @access Private
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     let guest = await Calc.findById(req.params.id)
//     if (!guest) return res.status(404).json({ msg: 'Calc not found' })
//     // check if user owns the guest 
//     if (guest.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorised' })
//     }
//     await Calc.findByIdAndRemove(req.params.id)
//     res.send('Calc Removed successfully')
//   } catch (err) {
//     console.errors(err.message).json('Server Error')
//   }
// });



module.exports = router;