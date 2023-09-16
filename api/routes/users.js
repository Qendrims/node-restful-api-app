const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/users');

 
router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

module.exports = router;