'use strict'
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    invoice: DataTypes.STRING,
    rent_estimation: DataTypes.STRING,
    return_time: DataTypes.STRING,
    forfeit: DataTypes.STRING,
    payment: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {})
  order.associate = function (models) {
    // associations can be defined here
  }
  return order
}
