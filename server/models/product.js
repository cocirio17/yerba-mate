const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Product', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nombre: { type: DataTypes.STRING(180), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
  marca: { type: DataTypes.STRING(120), allowNull: false, defaultValue: '' },
  imagen_url: { type: DataTypes.STRING(500) },
  categoria: { type: DataTypes.STRING(80) },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
  oferta: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  descuento_porcentaje: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 0, validate: { min: 0, max: 100 } },
  tipo_corte: { type: DataTypes.ENUM('con_palo', 'sin_palo', 'compuesta'), allowNull: false, defaultValue: 'con_palo' },
  origen: { type: DataTypes.ENUM('nacional', 'brasilera', 'uruguaya'), allowNull: false, defaultValue: 'nacional' },
  organica: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  barbacua: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  saborizada: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  sabor: { type: DataTypes.STRING(80), allowNull: false, defaultValue: '' },
}, { tableName: 'products', timestamps: true });
