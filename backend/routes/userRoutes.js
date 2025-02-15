
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

// Protect all User routes
router.use(authenticateJWT);
router.use(authorizeRoles('Admin'));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *                 example: janedoe
 *               Password:
 *                 type: string
 *                 example: userpassword
 *               Role:
 *                 type: string
 *                 enum: [Admin, User]
 *                 example: User
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation errors or username already exists
 *       401:
 *         description: Unauthorized
 */
router.post('/', [
  body('Username').notEmpty().withMessage('Username is required'),
  body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('Role').isIn(['Admin', 'User']).withMessage('Role must be either Admin or User'),
], userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 example: janedoe
 *               Password:
 *                 type: string
 *                 example: newpassword
 *               Role:
 *                 type: string
 *                 enum: [Admin, User]
 *                 example: Admin
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation errors or username already exists
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', [
  body('Username').optional().notEmpty().withMessage('Username cannot be empty'),
  body('Password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('Role').optional().isIn(['Admin', 'User']).withMessage('Role must be either Admin or User'),
], userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Cannot delete own account
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;