'use strict';
module.exports = (sequelize, DataTypes) => {
  const fuel_type = sequelize.define('fuel_type', {
    name: DataTypes.STRING
  }, {});
  fuel_type.associate = function(models) {
    // associations can be defined here
  };
  return fuel_type;
};