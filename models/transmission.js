'use strict'
module.exports = (sequelize, DataTypes) => {
  const transmission = sequelize.define('transmission', {
    name: DataTypes.STRING
  }, {})
  transmission.associate = function (models) {
    // associations can be defined here
    transmission.hasMany(models.product, {
      foreignKey: 'transmission_id',
      as: 'transmissionType',
      sourceKey: 'id'
    })
  }
  return transmission
}
