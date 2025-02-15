const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user registration
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Username
 *               - Password
 *               - Role
 *             properties:
 *               Username:
 *                 type: string
 *                 example: johndoe
 *               Password:
 *                 type: string
 *                 example: securepassword
 *               Role:
 *                 type: string
 *                 enum: [Admin, User]
 *                 example: User
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation errors or username already exists
 */
router.post('/register', [
  body('Username').notEmpty().withMessage('Username is required'),
  body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('Role').isIn(['Admin', 'User']).withMessage('Role must be either Admin or User'),
], register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Username
 *               - Password
 *             properties:
 *               Username:
 *                 type: string
 *                 example: johndoe
 *               Password:
 *                 type: string
 *                 example: securepassword
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', [
  body('Username').notEmpty().withMessage('Username is required'),
  body('Password').notEmpty().withMessage('Password is required'),
], login);

module.exports = router;