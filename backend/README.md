Employee Management System Backend
Project Overview
The Employee Management System Backend is a robust web-based application developed using Node.js and Express. It serves as the server-side component for managing employee data, departments, and user authentication. Leveraging Sequelize as the ORM and MySQL as the database, this backend provides a RESTful API with comprehensive features, including:

User Authentication: Secure login and registration using JWT.
Role-Based Authorization: Differentiated access for Admins and Users.
Employee Management: CRUD operations for employee records.
Department Management: CRUD operations for departments.
API Documentation: Interactive API docs using Swagger.
Features
Authentication:
User registration and login with JWT-based authentication.
Password hashing and salting using bcrypt.
Authorization:
Role-based access control differentiating Admins and Users.
CRUD Operations:
Employees: Create, Read, Update, Delete employee records.
Departments: Create, Read, Update, Delete department records.
Users: Manage user accounts (Admins only).
API Documentation:
Comprehensive and interactive documentation using Swagger UI.
Security:
Input validation and sanitization to prevent SQL injection and XSS attacks.
CORS configuration to control cross-origin requests.
Technologies Used
Runtime Environment: Node.js
Web Framework: Express
ORM: Sequelize
Database: MySQL
Authentication: jsonwebtoken (JWT), bcryptjs
API Documentation: Swagger UI
Other Tools:
dotenv for environment variable management.
Express Validator for input validation.
morgan for HTTP request logging.
nodemon for automatic server restarts during development.
Prerequisites
Ensure you have the following installed on your machine:

Node.js & npm: Download Here
MySQL: Download Here
Git: Download Here

-----------------------------------------------------------------
create .env file and add this keys

# Server Configuration
PORT=5001

# Database Configuration
DB_USER=YOUR DB USER
DB_PASSWORD=YOUR DB PASSWORD
DB_NAME=YOU DB NAME FOR EXAMPLE => employeeManagementSystem
DB_HOST=localhost
DB_PORT=YOU DB PORT

# JWT Configuration
JWT_SECRET=MYSECRETKEY
SALT_ROUND=10

# Client URL for CORS (to be updated when frontend is added)
CLIENT_URL=http://localhost:3000/