'use strict';
module.exports = (sequelize, DataTypes) => {
  const imageDetail = sequelize.define('imageDetail', {
    product_id: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  imageDetail.associate = function(models) {
    // associations can be defined here
  };
  return imageDetail;
};