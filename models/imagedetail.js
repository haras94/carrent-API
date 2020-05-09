'use strict'
module.exports = (sequelize, DataTypes) => {
  const imageDetail = sequelize.define('imageDetail', {
    product_id: DataTypes.STRING,
    image: DataTypes.STRING
  }, {})
  imageDetail.associate = function (models) {
    // associations can be defined here
    imageDetail.belongsTo(models.product,
      {
        foreignKey: 'product_id',
        as: 'images',
        sourceKey: 'id'
      })
  }
  return imageDetail
}
