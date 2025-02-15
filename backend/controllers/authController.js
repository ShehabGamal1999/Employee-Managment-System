
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Correctly import User from models
const { validationResult } = require('express-validator');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    // Validate Input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Username, Password, Role } = req.body;

    // Check if User Already Exists
    const existingUser = await User.findOne({ where: { Username } }); // Ensure User is defined
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create User
    const user = await User.create({
      Username,
      Password: hashedPassword,
      Role,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        Id: user.Id,
        Username: user.Username,
        Role: user.Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    // Validate Input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Username, Password } = req.body;

    // Find User
    const user = await User.findOne({ where: { Username } }); // Ensure User is defined
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare Passwords
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      userId: user.Id,
      role: user.Role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};