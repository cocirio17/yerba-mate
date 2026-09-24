const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');
const crypto = require('crypto');

const publicUser = (user) => { const value = user.toJSON(); delete value.password; return value; };
function tokenFor(user) { return jwt.sign({ id: user.id, email: user.email, rol: user.rol }, config.jwtSecret, { expiresIn: '7d' }); }
exports.me = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.json(publicUser(user));
  } catch (error) { return next(error); }
};

exports.register = async (req, res, next) => {
  try {
    const { nombre, apellido, email, password, direccion_defecto } = req.body;
    if (!nombre || !email || !password || password.length < 6) return res.status(400).json({ error: 'nombre, email y password (mínimo 6 caracteres) son requeridos' });
    const existing = await User.unscoped().findOne({ where: { email: email.toLowerCase() } });
    if (existing) return res.status(409).json({ error: 'El email ya está registrado' });
    const user = await User.create({ nombre, apellido: apellido || '', email: email.toLowerCase(), password: await bcrypt.hash(password, 12), direccion_defecto });
    return res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { return next(error); }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.unscoped().findOne({ where: { email: (email || '').toLowerCase() } });
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    return res.json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { return next(error); }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    const email = (req.body.email || '').toLowerCase();
    const user = await User.unscoped().findOne({ where: { email } });
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      await user.update({ reset_password_token: token, reset_password_expires: new Date(Date.now() + 15 * 60 * 1000) });
      console.log(`[YerbaShop] Password reset for ${email}: ${token}`);
    }
    return res.json({ message: 'Si el email existe, recibirás instrucciones para recuperar tu contraseña.' });
  } catch (error) { return next(error); }
};
