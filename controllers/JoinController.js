/* eslint-disable camelcase */
const {
  product, imageDetail, transmission, baggage_capacity, fuel_type, engine_capacity, additional_driver, person_capacity, doors, manufacturing_year, avg_fuel_consumption, srs_airbag
  // srs_airbag, car_brand, rentaller
} = require('../models')
const helpers = require('../helpers/response')

module.exports = {
  getImageDetail: async (req, res) => {
    const response = {}
    try {
      const data = await imageDetail.findAll({
        include: {
          model: product,
          as: 'images',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getTransmission: async (req, res) => {
    const response = {}
    try {
      const data = await transmission.findAll({
        include: {
          model: product,
          as: 'transmissionType',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getBaggageCapacity: async (req, res) => {
    const response = {}
    try {
      const data = await baggage_capacity.findAll({
        include: {
          model: product,
          as: 'baggageCapacity',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getfuelType: async (req, res) => {
    const response = {}
    try {
      const data = await fuel_type.findAll({
        include: {
          model: product,
          as: 'fuelType',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getEngineCapacity: async (req, res) => {
    const response = {}
    try {
      const data = await engine_capacity.findAll({
        include: {
          model: product,
          as: 'engineCapacity',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getAdditionalDriver: async (req, res) => {
    const response = {}
    try {
      const data = await additional_driver.findAll({
        include: {
          model: product,
          as: 'additionalDriver',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getPersonCapacity: async (req, res) => {
    const response = {}
    try {
      const data = await person_capacity.findAll({
        include: {
          model: product,
          as: 'personCapacity',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getAllDoors: async (req, res) => {
    const response = {}
    try {
      const data = await doors.findAll({
        include: {
          model: product,
          as: 'doorsType',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getManufacturingYear: async (req, res) => {
    const response = {}
    try {
      const data = await manufacturing_year.findAll({
        include: {
          model: product,
          as: 'manufacturingYear',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getAvgFuelConsumption: async (req, res) => {
    const response = {}
    try {
      const data = await avg_fuel_consumption.findAll({
        include: {
          model: product,
          as: 'avgFuelConsumption',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  getSrsAirbag: async (req, res) => {
    const response = {}
    try {
      const data = await srs_airbag.findAll({
        include: {
          model: product,
          as: 'srsAirbag',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      })
      if (data.length === 0) {
        response.status = 203
        response.message = 'List not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  }
}
