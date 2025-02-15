
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const rateLimit = require('express-rate-limit');

const app = express();


// Load environment variables
dotenv.config();

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware
// const corsOptions = {
//   origin: [
//     process.env.CLIENT_URL || 'http://localhost:3000', 
//     'http://localhost:5001'
//   ],
//   credentials: true,  // If using cookies or authentication headers
//   optionsSuccessStatus: 200
// };
app.use(cors({origion:'*',credentials : true}));
// app.options('*', cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
const sequelize = require('./config/db');
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync(); // Ensures models are synced with the database
  })
  .then(() => {
    // Start the server after successful DB connection
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/users', userRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);