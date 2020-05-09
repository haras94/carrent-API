/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const car_brand = sequelize.define('car_brand', {
    name: DataTypes.STRING
  }, {})
  car_brand.associate = function (models) {
    // associations can be defined here
    car_brand.hasMany(models.product,
      {
        foreignKey: 'id',
        as: 'productList'
        // sourceKey: 'car_brand'
      })
  }
  return car_brand
}
