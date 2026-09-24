const productDAO = require('../dao/productDao');
const VALID_TYPES = new Set(['con_palo', 'sin_palo', 'compuesta']);
const VALID_ORIGINS = new Set(['nacional', 'brasilera', 'uruguaya']);

class ProductValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

exports.list = async (req, res, next) => { try { const result = await productDAO.list(req.query); return res.json(result); } catch (e) { return next(e); } };
exports.detail = async (req, res, next) => { try { const product = await productDAO.findById(req.params.id); if (!product) return res.status(404).json({ error: 'Producto no encontrado' }); return res.json(product); } catch (e) { return next(e); } };
const productPayload = (req) => {
  const payload = {
    ...req.body,
  ...(req.file ? { imagen_url: `/uploads/${req.file.filename}` } : {}),
  ...(req.body.precio !== undefined ? { precio: Number(req.body.precio) } : {}),
  ...(req.body.stock !== undefined ? { stock: Number(req.body.stock) } : {}),
  ...(req.body.oferta !== undefined ? { oferta: req.body.oferta === 'true' || req.body.oferta === true } : {}),
  ...(req.body.organica !== undefined ? { organica: req.body.organica === 'true' || req.body.organica === true } : {}),
  ...(req.body.barbacua !== undefined ? { barbacua: req.body.barbacua === 'true' || req.body.barbacua === true } : {}),
  ...(req.body.saborizada !== undefined ? { saborizada: req.body.saborizada === 'true' || req.body.saborizada === true } : {}),
  ...(req.body.tipo_corte !== undefined ? { tipo_corte: req.body.tipo_corte } : {}),
  ...(req.body.origen !== undefined ? { origen: req.body.origen } : {}),
    ...(req.body.sabor !== undefined ? { sabor: String(req.body.sabor).trim() } : {}),
  };
  if (payload.tipo_corte !== undefined && !VALID_TYPES.has(payload.tipo_corte)) {
    throw new ProductValidationError('El tipo de corte no es válido.');
  }
  if (payload.origen !== undefined && !VALID_ORIGINS.has(payload.origen)) {
    throw new ProductValidationError('El origen no es válido.');
  }
  if (payload.saborizada === false) payload.sabor = '';
  return payload;
};

exports.create = async (req, res, next) => { try { return res.status(201).json(await productDAO.create(productPayload(req))); } catch (e) { return next(e); } };
exports.update = async (req, res, next) => { try { const product = await productDAO.update(req.params.id, productPayload(req)); if (!product) return res.status(404).json({ error: 'Producto no encontrado' }); return res.json(product); } catch (e) { return next(e); } };
exports.remove = async (req, res, next) => { try { const count = await productDAO.delete(req.params.id); if (!count) return res.status(404).json({ error: 'Producto no encontrado' }); return res.status(204).send(); } catch (e) { return next(e); } };
