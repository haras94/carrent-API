/* eslint-disable camelcase */
const { car_brand } = require('../models')
const helpers = require('../helpers/response')

module.exports = {
  insertCarBrand: async (req, res) => {
    const response = {}
    try {
      const { body } = req
      const data = await car_brand.create(body)
      if (data === undefined) {
        response.status = 203
        response.message = 'Input Product Failed'
        helpers.helpers(res, response)
      } else {
        response.status = 201
        response.message = 'Product Has Been Created'
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
  getCarBrand: async (req, res) => {
    const response = {}
    try {
      const data = await car_brand.findAll({})
      if (data.length === 0) {
        response.status = 203
        response.message = 'Order List not Found!'
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
  detailCarBrand: async (req, res) => {
    const response = {}
    try {
      const { carBrandId } = req.params
      const data = await car_brand.findOne({
        where: {
          id: carBrandId
        }
      })
      if (!data) {
        response.status = 203
        response.message = 'Detail Order Tidak Ditemukan!'
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
  updateCarBrand: async (req, res) => {
    const response = {}
    try {
      const { carBrandId } = req.params
      const { body } = req
      const [edit] = await car_brand.update(body, {
        where: {
          id: carBrandId
        }
      })
      const data = await car_brand.findOne({
        where: {
          id: carBrandId
        }
      })
      if (edit === 1) {
        response.status = 201
        response.message = 'User Successfully Edited'
        response.data = data
        helpers.helpers(res, response)
        if (edit === 0) {
          response.status = 404
          response.message = 'Data Not Found'
          helpers.helpers(res, response)
        }
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      helpers.helpers(res, response)
    }
  },
  deleteCarBrand: async (req, res) => {
    const response = {}
    try {
      const { carBrandId } = req.params
      const data = await car_brand.destroy({
        where: {
          id: carBrandId
        }
      })
      if (data) {
        response.status = 200
        response.message = 'Successfully Deleted'
        helpers.helpers(res, response)
      } else {
        response.status = 404
        response.message = 'Data Not Found'
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
