const { Sequelize } = require('sequelize');
const config = require('./config.js')['development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port, // Add this line to specify port
    dialect: config.dialect,
    logging: false, // Disable logging for cleaner output; set to console.log for debugging
    define: config.define,
  }
);

module.exports = sequelize;