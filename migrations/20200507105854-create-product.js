'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rentaller_id: {
        type: Sequelize.STRING
      },
      car_title: {
        type: Sequelize.STRING
      },
      price_per_day: {
        type: Sequelize.INTEGER
      },
      transmission_id: {
        type: Sequelize.STRING
      },
      baggage_capacity: {
        type: Sequelize.STRING
      },
      engine_capacity: {
        type: Sequelize.STRING
      },
      additional_driver: {
        type: Sequelize.STRING
      },
      person_capacity: {
        type: Sequelize.STRING
      },
      doors: {
        type: Sequelize.STRING
      },
      manufacturin_year: {
        type: Sequelize.INTEGER
      },
      avg_fuel_consumption: {
        type: Sequelize.INTEGER
      },
      srs_airbag: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};