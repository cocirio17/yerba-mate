const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Order', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  estado: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'En preparación' },
  direccion: { type: DataTypes.STRING(255) },
}, { tableName: 'orders', timestamps: true });
