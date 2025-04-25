'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn('users', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false, 
    });

   
    await queryInterface.addColumn('users', 'genero', {
      type: Sequelize.STRING,
      allowNull: false, 
    });

   
    await queryInterface.addColumn('users', 'dataNascimento', {
      type: Sequelize.DATEONLY,
      allowNull: false, 
      defaultValue: '1970-01-01', 
    });

    
    await queryInterface.addColumn('users', 'endereco', {
      type: Sequelize.STRING,
      allowNull: false, // Não pode ser nulo
    });

   
    await queryInterface.sequelize.query(
      `UPDATE users SET dataNascimento = '1970-01-01' WHERE dataNascimento = '0000-00-00'`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'cpf');
    await queryInterface.removeColumn('users', 'genero');
    await queryInterface.removeColumn('users', 'dataNascimento');
    await queryInterface.removeColumn('users', 'endereco');
  }
};
