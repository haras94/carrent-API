'use strict';
module.exports = (sequelize, DataTypes) => {
  const avg_fuel_consumption = sequelize.define('avg_fuel_consumption', {
    name: DataTypes.STRING
  }, {});
  avg_fuel_consumption.associate = function(models) {
    // associations can be defined here
  };
  return avg_fuel_consumption;
};