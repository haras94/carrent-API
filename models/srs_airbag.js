/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const srs_airbag = sequelize.define('srs_airbag', {
    name: DataTypes.STRING
  }, {})
  srs_airbag.associate = function (models) {
    // associations can be defined here
    srs_airbag.hasMany(models.product, {
      foreignKey: 'srs_airbag',
      as: 'srsAirbag',
      sourceKey: 'id'
    })
  }
  return srs_airbag
}
