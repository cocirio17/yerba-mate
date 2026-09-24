const app = require('./app');
const sequelize = require('./config/database');
require('./models');
const config = require('./config/config');

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(config.port, () => console.log(`YerbaShop API listening on port ${config.port}`));
}
if (require.main === module) start().catch((error) => { console.error('Unable to start API', error); process.exit(1); });
module.exports = { app, sequelize, start };
