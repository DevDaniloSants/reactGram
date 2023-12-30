const express = require('express');
const router = express.Router();

// Controller
const { register, login } = require('../controllers/UserController');

// middlewares
const validate = require('../middlewares/handleValidation.js');
const {
  userCreateValidation,
  loginValidation,
} = require('../middlewares/userValidation.js');

// Routes
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);

module.exports = router;
