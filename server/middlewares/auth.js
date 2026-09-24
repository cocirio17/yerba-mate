const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    return next();
  } catch (error) { return res.status(401).json({ error: 'Token inválido o expirado' }); }
}
function verifyAdmin(req, res, next) {
  if (req.user && req.user.rol === 'admin') return next();
  return res.status(403).json({ error: 'Se requieren permisos de administrador' });
}
module.exports = { authenticate, verifyAdmin };
