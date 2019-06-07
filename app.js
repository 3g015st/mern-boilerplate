const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const path = require('path');
require('dotenv').config();

// Config
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

mongoose.connect(process.env.URI)
.then(res => {
    app.listen(process.env.PORT || 3000);
})
.catch(err => console.log(err));

