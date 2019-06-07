const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Config
app.use(bodyParser.json());
app.use(cors());

// Controllers
const authController = require('../controllers/auth');

// Routes
const router = express.Router();
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);


module.exports = router;

