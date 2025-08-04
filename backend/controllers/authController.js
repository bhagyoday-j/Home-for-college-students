const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'sahara_secret';

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ username, password });
  await user.save();
  res.json({ message: 'Registered successfully' });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful' });
};

exports.getProfile = async (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
};