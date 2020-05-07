'use strict';
module.exports = (sequelize, DataTypes) => {
  const baggage_capacity = sequelize.define('baggage_capacity', {
    name: DataTypes.STRING
  }, {});
  baggage_capacity.associate = function(models) {
    // associations can be defined here
  };
  return baggage_capacity;
};