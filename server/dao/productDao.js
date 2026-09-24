const { Op } = require('sequelize');
const { Product } = require('../models');
const sequelize = require('../config/database');

class ProductDAO {
  list(filters = {}) {
    const where = {};
    const values = (value) => (Array.isArray(value) ? value : String(value || '').split(',')).map(item => item.trim()).filter(Boolean);
    const applyIn = (field, value) => { const items = values(value); if (items.length) where[field] = { [Op.in]: items }; };
    if (filters.search) {
      const operator = sequelize.getDialect() === 'postgres' ? Op.iLike : Op.like;
      where.nombre = { [operator]: `%${filters.search}%` };
    }
    if (filters.categoria) where.categoria = filters.categoria;
    applyIn('marca', filters.marca);
    applyIn('tipo_corte', filters.tipo || filters.tipo_corte);
    applyIn('origen', filters.origen);
    applyIn('sabor', filters.sabor);
    ['organica', 'barbacua', 'saborizada'].forEach(field => {
      if (filters[field] !== undefined) where[field] = filters[field] === true || filters[field] === 'true';
    });
    if (filters.oferta !== undefined) where.oferta = filters.oferta === true || filters.oferta === 'true';
    if (filters.minPrice !== undefined) where.precio = { ...(where.precio || {}), [Op.gte]: Number(filters.minPrice) };
    if (filters.maxPrice !== undefined) where.precio = { ...(where.precio || {}), [Op.lte]: Number(filters.maxPrice) };
    const limit = Math.min(Math.max(Number(filters.limit) || 20, 1), 100);
    const offset = Math.max(Number(filters.offset) || 0, 0);
    return Product.findAndCountAll({ where, limit, offset, order: [['createdAt', 'DESC']] });
  }
  findById(id) { return Product.findByPk(id, { include: [{ association: 'reviews', include: ['user'] }] }); }
  create(data) { return Product.create(data); }
  update(id, data) { return Product.findByPk(id).then(product => product ? product.update(data) : null); }
  delete(id) { return Product.destroy({ where: { id } }); }
}
module.exports = new ProductDAO();
