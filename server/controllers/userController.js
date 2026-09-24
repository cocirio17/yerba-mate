const { User } = require('../models');
exports.me = async (req, res, next) => { try { const user = await User.findByPk(req.user.id, { include: [{ association: 'orders', include: ['items'] }] }); if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); return res.json(user); } catch (e) { return next(e); } };
