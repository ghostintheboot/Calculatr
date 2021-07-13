/*3️⃣*/
const express = require('express');
const router = express.Router();
const { register, login, forgotpassword, resetpassword } = require('../controllers/authCon.js');



// It's another way of writing router.post('/register', authCon.whatever).
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotpassword);
router.route('/resetpassword/:resetToken').put(resetpassword);



module.exports = router;