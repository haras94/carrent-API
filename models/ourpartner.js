'use strict'
module.exports = (sequelize, DataTypes) => {
  const ourPartner = sequelize.define('ourPartner', {
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {})
  ourPartner.associate = function (models) {
    // associations can be defined here
  }
  return ourPartner
}
