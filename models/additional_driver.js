'use strict';
module.exports = (sequelize, DataTypes) => {
  const additional_driver = sequelize.define('additional_driver', {
    name: DataTypes.STRING
  }, {});
  additional_driver.associate = function(models) {
    // associations can be defined here
  };
  return additional_driver;
};