/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const engine_capacity = sequelize.define('engine_capacity', {
    name: DataTypes.STRING
  }, {})
  engine_capacity.associate = function (models) {
    // associations can be defined here
    engine_capacity.hasMany(models.product, {
      foreignKey: 'engine_capacity',
      as: 'engineCapacity',
      sourceKey: 'id'
    })
  }
  return engine_capacity
}
