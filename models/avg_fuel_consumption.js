/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const avg_fuel_consumption = sequelize.define('avg_fuel_consumption', {
    name: DataTypes.STRING
  }, {})
  avg_fuel_consumption.associate = function (models) {
    avg_fuel_consumption.hasMany(models.product, {
      foreignKey: 'avg_fuel_consumption',
      as: 'avgFuelConsumption',
      sourceKey: 'id'
    })
    // associations can be defined here
  }
  return avg_fuel_consumption
}
