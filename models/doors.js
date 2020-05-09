'use strict'
module.exports = (sequelize, DataTypes) => {
  const doors = sequelize.define('doors', {
    name: DataTypes.STRING
  }, {})
  doors.associate = function (models) {
    // associations can be defined here
    doors.hasMany(models.product, {
      foreignKey: 'doors',
      as: 'doorsType',
      sourceKey: 'id'
    })
  }
  return doors
}
