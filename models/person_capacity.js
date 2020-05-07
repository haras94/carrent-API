'use strict';
module.exports = (sequelize, DataTypes) => {
  const person_capacity = sequelize.define('person_capacity', {
    name: DataTypes.STRING
  }, {});
  person_capacity.associate = function(models) {
    // associations can be defined here
  };
  return person_capacity;
};