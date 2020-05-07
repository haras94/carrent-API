'use strict';
module.exports = (sequelize, DataTypes) => {
  const transmission = sequelize.define('transmission', {
    name: DataTypes.STRING
  }, {});
  transmission.associate = function(models) {
    // associations can be defined here
  };
  return transmission;
};