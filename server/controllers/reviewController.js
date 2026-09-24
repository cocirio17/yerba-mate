const { Review, Product } = require('../models');
exports.create = async (req, res, next) => {
  try {
    const { calificacion, comentario } = req.body;
    const product = await Product.findByPk(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    const review = await Review.create({ calificacion, comentario, productId: product.id, userId: req.user.id });
    return res.status(201).json(await Review.findByPk(review.id, { include: ['user'] }));
  } catch (e) { return next(e); }
};
