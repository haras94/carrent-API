/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const additional_driver = sequelize.define('additional_driver', {
    name: DataTypes.STRING
  }, {})
  additional_driver.associate = function (models) {
    // associations can be defined here
    additional_driver.hasMany(models.product, {
      foreignKey: 'additional_driver',
      as: 'additionalDriver',
      sourceKey: 'id'
    })
  }
  return additional_driver
}
