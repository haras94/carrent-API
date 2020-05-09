'use strict';
module.exports = (sequelize, DataTypes) => {
  const car_brand = sequelize.define('car_brand', {
    name: DataTypes.STRING
  }, {});
  car_brand.associate = function(models) {
    // associations can be defined here
  };
  return car_brand;
};