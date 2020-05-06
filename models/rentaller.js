'use strict'
module.exports = (sequelize, DataTypes) => {
  const rentaller = sequelize.define('rentaller', {
    fullname: DataTypes.STRING,
    rental_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    id_card: DataTypes.STRING
  }, {})
  rentaller.associate = function (models) {
    // associations can be defined here
  }
  return rentaller
}
