'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'tipo_corte', {
      type: Sequelize.ENUM('con_palo', 'sin_palo', 'compuesta'),
      allowNull: false,
      defaultValue: 'con_palo',
    });
    await queryInterface.addColumn('products', 'origen', {
      type: Sequelize.ENUM('nacional', 'brasilera', 'uruguaya'),
      allowNull: false,
      defaultValue: 'nacional',
    });
    await queryInterface.addColumn('products', 'organica', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('products', 'barbacua', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('products', 'saborizada', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('products', 'sabor', {
      type: Sequelize.STRING(80),
      allowNull: false,
      defaultValue: '',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('products', 'sabor');
    await queryInterface.removeColumn('products', 'saborizada');
    await queryInterface.removeColumn('products', 'barbacua');
    await queryInterface.removeColumn('products', 'organica');
    await queryInterface.removeColumn('products', 'origen');
    await queryInterface.removeColumn('products', 'tipo_corte');
  },
};
