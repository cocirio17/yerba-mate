const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nombre: { type: DataTypes.STRING(120), allowNull: false },
  apellido: { type: DataTypes.STRING(120), allowNull: false, defaultValue: '' },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING(255), allowNull: false },
  rol: { type: DataTypes.ENUM('admin', 'cliente'), allowNull: false, defaultValue: 'cliente' },
  direccion_defecto: { type: DataTypes.STRING(255) },
  reset_password_token: { type: DataTypes.STRING(128) },
  reset_password_expires: { type: DataTypes.DATE },
}, { tableName: 'users', timestamps: true, defaultScope: { attributes: { exclude: ['password'] } } });

module.exports = User;
