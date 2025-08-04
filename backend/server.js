const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
require('./config/db')();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


app.listen(PORT, () => {
  console.log(`Sahara server running at http://localhost:${PORT}`);
});