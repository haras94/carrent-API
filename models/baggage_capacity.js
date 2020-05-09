/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const baggage_capacity = sequelize.define('baggage_capacity', {
    name: DataTypes.STRING
  }, {})
  baggage_capacity.associate = function (models) {
    // associations can be defined here
    baggage_capacity.hasMany(models.product, {
      foreignKey: 'baggage_capacity',
      as: 'baggageCapacity',
      sourceKey: 'id'
    })
  }
  return baggage_capacity
}
