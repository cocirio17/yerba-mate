const bcrypt = require('bcryptjs');
const { Product, User } = require('./models');
const sequelize = require('./config/database');

const products = [
  ['Canarias', 'Canarias Serena', 6500, 'Canarias', 30, 15, 'sin_palo', 'uruguaya', false, false, false, ''],
  ['Baldo', 'Baldo Tradicional', 7200, 'Baldo', 25, 10, 'con_palo', 'brasilera', false, true, false, ''],
  ['Rei Verde', 'Rei Verde Premium', 6800, 'Rei Verde', 20, 0, 'compuesta', 'brasilera', true, false, true, 'menta'],
  ['Playadito', 'Playadito Suave', 5900, 'Playadito', 35, 20, 'con_palo', 'nacional', false, false, false, ''],
  ['Rosamonte', 'Rosamonte Especial', 6100, 'Rosamonte', 30, 0, 'sin_palo', 'nacional', false, false, false, '']
];

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync();
  const password = await bcrypt.hash('admin123', 12);
  await User.findOrCreate({
    where: { email: 'admin@yerbashop.com' },
    defaults: {
      nombre: 'Admin',
      apellido: 'YerbaShop',
      email: 'admin@yerbashop.com',
      password,
      rol: 'admin',
    },
  });
  for (const [marca, nombre, precio, brand, stock, descuento_porcentaje, tipo_corte, origen, organica, barbacua, saborizada, sabor] of products) {
    await Product.findOrCreate({ where: { nombre }, defaults: { marca: brand, precio, stock, descuento_porcentaje, oferta: descuento_porcentaje > 0, tipo_corte, origen, organica, barbacua, saborizada, sabor, categoria: 'Yerba', descripcion: `${nombre}, una yerba seleccionada para tu ritual.` } });
  }
  await sequelize.close();
}
if (require.main === module) seed().then(() => console.log('Products seeded')).catch(error => { console.error(error); process.exitCode = 1; });
module.exports = seed;
