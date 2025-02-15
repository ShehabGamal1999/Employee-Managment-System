const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

// Protect all Employee routes
router.use(authenticateJWT);
// router.use(authorizeRoles('Admin'));

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 *       401:
 *         description: Unauthorized
 */
router.get('/', employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee data
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - FirstName
 *               - LastName
 *               - Email
 *               - DepartmentId
 *               - HireDate
 *               - Salary
 *             properties:
 *               FirstName:
 *                 type: string
 *                 example: Jane
 *               LastName:
 *                 type: string
 *                 example: Doe
 *               Email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               DepartmentId:
 *                 type: integer
 *                 example: 1
 *               HireDate:
 *                 type: string
 *                 format: date
 *                 example: 2023-01-15
 *               Salary:
 *                 type: number
 *                 format: float
 *                 example: 60000.00
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorizeRoles('Admin') ,[
  body('FirstName').notEmpty().withMessage('First name is required'),
  body('LastName').notEmpty().withMessage('Last name is required'),
  body('Email').isEmail().withMessage('Valid email is required'),
  body('DepartmentId').isInt({ gt: 0 }).withMessage('Department ID must be a positive integer'),
  body('HireDate').isISO8601().toDate().withMessage('Valid hire date is required'),
  body('Salary').isDecimal({ decimal_digits: '0,2' }).withMessage('Valid salary is required'),
], employeeController.createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *                 example: Jane
 *               LastName:
 *                 type: string
 *                 example: Smith
 *               Email:
 *                 type: string
 *                 example: jane.smith@example.com
 *               DepartmentId:
 *                 type: integer
 *                 example: 2
 *               HireDate:
 *                 type: string
 *                 format: date
 *                 example: 2023-02-20
 *               Salary:
 *                 type: number
 *                 format: float
 *                 example: 65000.00
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id',authorizeRoles('Admin'), [
  body('Email').optional().isEmail().withMessage('Valid email is required'),
  body('DepartmentId').optional().isInt({ gt: 0 }).withMessage('Department ID must be a positive integer'),
  body('HireDate').optional().isISO8601().toDate().withMessage('Valid hire date is required'),
  body('Salary').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Valid salary is required'),
], employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorizeRoles('Admin'), employeeController.deleteEmployee);

module.exports = router;