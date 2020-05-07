'use strict';
module.exports = (sequelize, DataTypes) => {
  const srs_airbag = sequelize.define('srs_airbag', {
    name: DataTypes.STRING
  }, {});
  srs_airbag.associate = function(models) {
    // associations can be defined here
  };
  return srs_airbag;
};