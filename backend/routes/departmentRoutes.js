
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management
 */

// Protect all Department routes
router.use(authenticateJWT);
// router.use(authorizeRoles('Admin'));

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: List of departments
 *       401:
 *         description: Unauthorized
 */
router.get('/', departmentController.getAllDepartments);

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department data
 *       404:
 *         description: Department not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', departmentController.getDepartmentById);

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Finance
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation errors or department already exists
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorizeRoles('Admin'),  [
  body('Name').notEmpty().withMessage('Department name is required'),
], departmentController.createDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: Update an existing department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Research & Development
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Department not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id',authorizeRoles('Admin'), [
  body('Name').optional().notEmpty().withMessage('Department name cannot be empty'),
], departmentController.updateDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: Delete a department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorizeRoles('Admin'), departmentController.deleteDepartment);

module.exports = router;