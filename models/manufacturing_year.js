/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const manufacturing_year = sequelize.define('manufacturing_year', {
    name: DataTypes.STRING
  }, {})
  manufacturing_year.associate = function (models) {
    // associations can be defined here
    manufacturing_year.hasMany(models.product, {
      foreignKey: 'manufacturing_year',
      as: 'manufacturingYear',
      sourceKey: 'id'
    })
  }
  return manufacturing_year
}
