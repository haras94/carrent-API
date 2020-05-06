'use strict'
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    isActived: DataTypes.STRING
  }, {})
  status.associate = function (models) {
    // associations can be defined here
  }
  return status
}
