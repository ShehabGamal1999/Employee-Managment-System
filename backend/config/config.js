require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "your db pass",
    database: process.env.DB_NAME || "your db name",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    port: 3306
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD   || "your db pass",
    database: process.env.DB_NAME || "your db name",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "your db pass",
    database: process.env.DB_NAME || "your db name",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
};
