/* eslint-disable camelcase */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const person_capacity = sequelize.define('person_capacity', {
    name: DataTypes.STRING
  }, {})
  person_capacity.associate = function (models) {
    // associations can be defined here
    person_capacity.hasMany(models.product, {
      foreignKey: 'person_capacity',
      as: 'personCapacity',
      sourceKey: 'id'
    })
  }
  return person_capacity
}
