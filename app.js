const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const multiPart = multer();
const app = express();
const path = require('path');
require('dotenv').config();

const corsSettings = {
    "origin": "*",
    "methods": "GET, PUT, PATCH, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ['Content-Type', 'Authorization']
}

// Config
app.use(cors(corsSettings));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(multiPart.array()); 
app.use(express.static('public'));

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Filter errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

mongoose.connect(process.env.URI)
.then(res => {
    app.listen(process.env.PORT || 3000, () => console.log('App.js: Server started!'));
})
.catch(err => console.log(err));

