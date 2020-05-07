'use strict';
module.exports = (sequelize, DataTypes) => {
  const manufacturing_year = sequelize.define('manufacturing_year', {
    name: DataTypes.STRING
  }, {});
  manufacturing_year.associate = function(models) {
    // associations can be defined here
  };
  return manufacturing_year;
};