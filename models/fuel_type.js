/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const fuel_type = sequelize.define('fuel_type', {
    name: DataTypes.STRING
  }, {})
  fuel_type.associate = function (models) {
    // associations can be defined here
    fuel_type.hasMany(models.product, {
      foreignKey: 'fuel_type',
      as: 'fuelType',
      sourceKey: 'id'
    })
  }
  return fuel_type
}
