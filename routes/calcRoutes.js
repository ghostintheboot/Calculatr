const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authProtect');
const { check, validationResult } = require('express-validator');



// CalcSchema Model.
const CalcData = require('../models/CalcData');



// @route GET /api/calc
// @des Get calculations from one logged-in user.
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



// @route POST /api/calc
// @des Add new calculation.
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



// @route PUT /api/calc/:id
// @des Update a user's calculation.
// @access Private
router.put('/:id', protect, async (req, res) => {
  const { calculations, notes } = req.body; // Basic destructuring.

  // Build a Calc object.
  const calcFields = { calculations, notes };

  try {
    let calcToUpdate = await CalcData.findById(req.params.id);

    // Check if calcToUpdate exists.
    if (!calcToUpdate) return res.status(404).json({ msg: 'Calculation not found.' });

    // Make sure user owns the calcToUpdate id.
    if (calcToUpdate.user.toString() !== req.user.id) {
      // In the vid, he used  if (!guest) {...
      return res.status(401).json({ msg: 'Not authorized for this procedure.' });
    }

    calcToUpdate = await CalcData.findByIdAndUpdate(
      req.params.id, 
      { $set: calcFields }, 
      { new: true }
    );
    res.send(calcToUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route DELETE /api/calc/:id
// @des Delete a user's calculation.
// @access Private
router.delete('/:id', protect, async (req, res) => {
  try {
    let calcToDelete = await CalcData.findById(req.params.id);

    // Check if calcToDelete exists.
    if (!calcToDelete) return res.status(404).json({ msg: 'This calculation was not found.' });

    // Check if user owns the calcToDelete.
    if (calcToDelete.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to perform this action.' });
    }

    await CalcData.findByIdAndRemove(req.params.id);
    res.send('Calc removed successfully!');
  } catch (err) {
    console.errors(err.message).json('Server Error.');
  }
});



module.exports = router;