'use strict'
module.exports = (sequelize, DataTypes) => {
  const rentaller = sequelize.define('rentaller', {
    fullname: DataTypes.STRING,
    rental_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    id_card: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {})
  rentaller.associate = function (models) {
    // associations can be defined here
    rentaller.belongsTo(models.status, {
      foreignKey: 'status',
      as: 'isActivated',
      sourceKey: 'id'
    })
  }
  return rentaller
}
