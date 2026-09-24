const dotenv = require('dotenv');
dotenv.config();

const dialect = (process.env.DB_DIALECT || 'mysql').toLowerCase();
const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  database: {
    database: process.env.DB_NAME || 'yerbashop',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || (dialect === 'mysql' ? 3306 : 5432)),
    dialect,
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  },
};

module.exports = config;
