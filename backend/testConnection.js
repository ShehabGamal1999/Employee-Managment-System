
const sequelize = require('./config/db');

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    process.exit(0); 
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); 
  });