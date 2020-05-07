'use strict';
module.exports = (sequelize, DataTypes) => {
  const engine_capacity = sequelize.define('engine_capacity', {
    name: DataTypes.STRING
  }, {});
  engine_capacity.associate = function(models) {
    // associations can be defined here
  };
  return engine_capacity;
};