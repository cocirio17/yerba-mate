function errorHandler(error, req, res, next) {
  console.error(error);
  if (res.headersSent) return next(error);
  const status = error.name === 'SequelizeValidationError' || error.name === 'MulterError' ? 400 : (error.status || 500);
  return res.status(status).json({ error: status === 500 ? 'Error interno del servidor' : error.message });
}
module.exports = errorHandler;
