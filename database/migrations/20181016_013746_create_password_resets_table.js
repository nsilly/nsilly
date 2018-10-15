'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function handleTransaction(t) {
      return Promise.all([
        queryInterface.createTable('password_resets', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          email: {
            type: Sequelize.STRING
          },
          token: {
            type: Sequelize.STRING
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE
          }
        })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function handleTransaction(t) {
      return Promise.all([queryInterface.dropTable('password_resets')]);
    });
  }
};
