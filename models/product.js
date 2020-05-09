'use strict'
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    rentaller_id: DataTypes.STRING,
    car_title: DataTypes.STRING,
    description: DataTypes.STRING,
    car_brand: DataTypes.INTEGER,
    price_per_day: DataTypes.INTEGER,
    transmission_id: DataTypes.INTEGER,
    baggage_capacity: DataTypes.INTEGER,
    engine_capacity: DataTypes.INTEGER,
    additional_driver: DataTypes.INTEGER,
    person_capacity: DataTypes.INTEGER,
    doors: DataTypes.INTEGER,
    manufacturing_year: DataTypes.INTEGER,
    fuel_type: DataTypes.INTEGER,
    avg_fuel_consumption: DataTypes.INTEGER,
    srs_airbag: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {})
  product.associate = function (models) {
    // associations can be defined here
    product.hasMany(models.imageDetail,
      {
        foreignKey: 'product_id',
        as: 'images',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.rentaller,
      {
        foreignKey: 'rentaller_id',
        as: 'rentaller'
      }
    )
    product.belongsTo(models.transmission,
      {
        foreignKey: 'transmission_id',
        as: 'transmissionType',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.baggage_capacity,
      {
        foreignKey: 'baggage_capacity',
        as: 'baggageCapacity',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.fuel_type,
      {
        foreignKey: 'fuel_type',
        as: 'fuelType',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.engine_capacity,
      {
        foreignKey: 'engine_capacity',
        as: 'engineCapacity',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.additional_driver,
      {
        foreignKey: 'additional_driver',
        as: 'additionalDriver',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.person_capacity,
      {
        foreignKey: 'person_capacity',
        as: 'personCapacity',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.doors,
      {
        foreignKey: 'doors',
        as: 'doorsType',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.manufacturing_year,
      {
        foreignKey: 'manufacturing_year',
        as: 'manufacturingYear',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.avg_fuel_consumption,
      {
        foreignKey: 'avg_fuel_consumption',
        as: 'avgFuelConsumption',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.srs_airbag,
      {
        foreignKey: 'srs_airbag',
        as: 'srsAirbag',
        sourceKey: 'id'
      }
    )
    product.belongsTo(models.car_brand,
      {
        foreignKey: 'car_brand',
        as: 'carBrand'
      }
    )
  }
  return product
}
