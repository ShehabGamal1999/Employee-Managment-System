
const { User } = require('../models'); // Correctly import User
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['Id', 'Username', 'Role', 'createdAt'],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get User By ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['Id', 'Username', 'Role', 'createdAt'],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Create New User
exports.createUser = async (req, res, next) => {
  try {
    // Validate Input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Username, Password, Role } = req.body;

    // Check if Username already exists
    const existingUser = await User.findOne({ where: { Username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      Username,
      Password: hashedPassword,
      Role,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        Id: user.Id,
        Username: user.Username,
        Role: user.Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update Existing User
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find User
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate Input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Username, Password, Role } = req.body;

    // If Username is being updated, check for uniqueness
    if (Username && Username !== user.Username) {
      const existingUser = await User.findOne({ where: { Username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // Prepare Update Data
    const updateData = {};
    if (Username) updateData.Username = Username;
    if (Role) updateData.Role = Role;

    // If Password is provided, hash it
    if (Password) {
      const hashedPassword = await bcrypt.hash(Password, 10);
      updateData.Password = hashedPassword;
    }

    // Update User
    await user.update(updateData);

    res.json({
      message: 'User updated successfully',
      user: {
        Id: user.Id,
        Username: user.Username,
        Role: user.Role,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find User
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent Admin from deleting themselves
    if (user.Id === req.user.userId) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};