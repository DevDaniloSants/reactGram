const express = require('express');
const router = express.Router();

// Controller
const { register } = require('../controllers/UserController');

// middlewares
const validate = require('../middlewares/handleValidation.js');
const { userCreateValidation } = require('../middlewares/userValidation.js');
// Routes
router.post('/register', userCreateValidation(), validate, register);

module.exports = router;
