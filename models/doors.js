'use strict';
module.exports = (sequelize, DataTypes) => {
  const doors = sequelize.define('doors', {
    name: DataTypes.STRING
  }, {});
  doors.associate = function(models) {
    // associations can be defined here
  };
  return doors;
};