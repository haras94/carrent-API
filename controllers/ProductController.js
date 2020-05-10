/* eslint-disable camelcase */
const {
  product, imageDetail, transmission, baggage_capacity, fuel_type, engine_capacity,
  additional_driver, person_capacity, doors, manufacturing_year, avg_fuel_consumption,
  srs_airbag, car_brand, rentaller
} = require('../models')
const { Op } = require('sequelize')
const helpers = require('../helpers/response')

module.exports = {
  insertProduct: async (req, res) => {
    const response = {}
    const { files } = req
    try {
      const input = req.body
      const data = await product.create(input)
      if (data === undefined) {
        response.status = 203
        response.message = 'Input Product Failed'
        helpers.helpers(res, response)
      } else {
        files.forEach(file => {
          const url = `http://${req.get('host')}/${file.path.replace(/\\/g, '/')}`
          imageDetail.create({
            product_id: data.id,
            image: url
          })
        })
        console.log(files)
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

  getProduct: async (req, res) => {
    let pagination = {}
    try {
      const param = {}
      let searchParam = {}
      const { sort } = req.query
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 8
      const offset = (page * limit) - limit
      const path = `http://${req.get('host') + req.baseUrl}?page`
      const { search } = req.query
      const include = [
        {
          model: imageDetail,
          as: 'images',
          attributes: ['image']
        },
        {
          model: rentaller,
          as: 'rentaller',
          attributes: ['rental_name', 'address']
        },
        {
          model: car_brand,
          as: 'carBrand',
          attributes: ['name']
        },
        {
          model: transmission,
          as: 'transmissionType',
          attributes: ['name']
        },
        {
          model: baggage_capacity,
          as: 'baggageCapacity',
          attributes: ['name']
        },
        {
          model: engine_capacity,
          as: 'engineCapacity',
          attributes: ['name']
        },
        {
          model: fuel_type,
          as: 'fuelType',
          attributes: ['name']
        },
        {
          model: additional_driver,
          as: 'additionalDriver',
          attributes: ['name']
        },
        {
          model: person_capacity,
          as: 'personCapacity',
          attributes: ['name']
        },
        {
          model: doors,
          as: 'doorsType',
          attributes: ['name']
        },
        {
          model: manufacturing_year,
          as: 'manufacturingYear',
          attributes: ['name']
        },
        {
          model: avg_fuel_consumption,
          as: 'avgFuelConsumption',
          attributes: ['name']
        },
        {
          model: srs_airbag,
          as: 'srsAirbag',
          attributes: ['name']
        }
      ]
      let sortType = req.query.sort_type || ''
      sortType = sortType.toUpperCase() || 'ASC'
      if (sort !== undefined) {
        param.order = [[sort, sortType]]
      }
      param.offset = offset
      param.limit = limit
      param.include = include
      if (search !== undefined) {
        const where = {
          [Op.or]: [
            { car_title: { [Op.substring]: search } }
          ]
        }
        console.log('here')
        param.where = where
        searchParam = { where }
      }
      const data = await product.findAll(param)
      const count = await product.count(searchParam)
      pagination = {
        current_page: page,
        offset,
        limit,
        total_data: count,
        per_page: data.length,
        path
      }
      if (data.length === 0) {
        pagination.status = 404
        pagination.message = 'Product not Found!'
        helpers.pagination(res, req.query, pagination)
      } else {
        pagination.status = 200
        pagination.message = 'OK!'
        pagination.data = data
        helpers.pagination(res, req.query, pagination)
      }
    } catch (err) {
      pagination = {}
      pagination.status = 500
      pagination.message = 'Internal Server Error'
      pagination.err = err
      helpers.pagination(res, req.query, pagination)
    }
  },
  detailProduct: async (req, res) => {
    let response = {}
    try {
      const { productId } = req.params
      const param = {}
      const where = {
        id: productId
      }
      const include = [
        {
          model: imageDetail,
          as: 'images',
          attributes: ['image']
        },
        {
          model: rentaller,
          as: 'rentaller',
          attributes: ['rental_name', 'address']
        },
        {
          model: car_brand,
          as: 'carBrand',
          attributes: ['name']
        },
        {
          model: transmission,
          as: 'transmissionType',
          attributes: ['name']
        },
        {
          model: baggage_capacity,
          as: 'baggageCapacity',
          attributes: ['name']
        },
        {
          model: fuel_type,
          as: 'fuelType',
          attributes: ['name']
        },
        {
          model: additional_driver,
          as: 'additionalDriver',
          attributes: ['name']
        },
        {
          model: person_capacity,
          as: 'personCapacity',
          attributes: ['name']
        },
        {
          model: doors,
          as: 'doorsType',
          attributes: ['name']
        },
        {
          model: manufacturing_year,
          as: 'manufacturingYear',
          attributes: ['name']
        },
        {
          model: avg_fuel_consumption,
          as: 'avgFuelConsumption',
          attributes: ['name']
        },
        {
          model: srs_airbag,
          as: 'srsAirbag',
          attributes: ['name']
        }
      ]
      param.where = where
      param.include = include
      const data = await product.findOne(param)
      if (!data) {
        response.status = 404
        response.message = 'Product not Found!'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },

  updateProduct: async (req, res) => {
    const response = {}
    // const { files } = req
    try {
      const { productId } = req.params
      const body = req.body

      const [edit] = await product.update(body,
        {
          where: {
            id: productId
          }
        })
      const data = await product.findOne({
        where: {
          id: productId
        }
      })
      if (edit === 0) {
        response.status = 404
        response.message = 'Product not Found!'
        helpers.helpers(res, response)
      } if (edit === 1) {
        // imageDetail.destroy({
        //   where: {
        //     product_id: productId
        //   }
        // })
        // files.forEach(file => {
        //   const url = `http://${req.get('host')}/${file.path.replace(/\\/g, '/')}`
        //   imageDetail.create({
        //     product_id: data.id,
        //     image: url
        //   }, {
        //     where: {
        //       product_id: productId
        //     }
        //   })
        // })
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

  deleteProduct: async (req, res) => {
    const response = {}
    try {
      const { productId } = req.params
      const data = await product.destroy({
        where: {
          id: productId
        }
      })
      if (data) {
        response.status = 200
        response.message = 'Product Successfully Deleted'
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
  },
  uploadImage: async (req, res) => {
    const response = {}
    const { files } = req
    try {
      const { productId } = req.params
      files.forEach(file => {
        const url = `http://${req.get('host')}/${file.path.replace(/\\/g, '/')}`
        imageDetail.create({
          product_id: productId,
          image: url
        }, {
          where: {
            product_id: productId
          }
        })
      })
      imageDetail.destroy({
        where: {
          product_id: productId
        }
      })
      const param = {}
      const where = {
        id: productId
      }
      const include = [
        {
          model: imageDetail,
          as: 'images',
          attributes: ['image']
        },
        {
          model: rentaller,
          as: 'rentaller',
          attributes: ['rental_name', 'address']
        },
        {
          model: car_brand,
          as: 'carBrand',
          attributes: ['name']
        },
        {
          model: transmission,
          as: 'transmissionType',
          attributes: ['name']
        },
        {
          model: baggage_capacity,
          as: 'baggageCapacity',
          attributes: ['name']
        },
        {
          model: fuel_type,
          as: 'fuelType',
          attributes: ['name']
        },
        {
          model: additional_driver,
          as: 'additionalDriver',
          attributes: ['name']
        },
        {
          model: person_capacity,
          as: 'personCapacity',
          attributes: ['name']
        },
        {
          model: doors,
          as: 'doorsType',
          attributes: ['name']
        },
        {
          model: manufacturing_year,
          as: 'manufacturingYear',
          attributes: ['name']
        },
        {
          model: avg_fuel_consumption,
          as: 'avgFuelConsumption',
          attributes: ['name']
        },
        {
          model: srs_airbag,
          as: 'srsAirbag',
          attributes: ['name']
        }
      ]
      param.where = where
      param.include = include
      const data = await product.findOne(param)
      if (files === undefined) {
        response.status = 203
        response.message = 'Edit Image Product Failed'
        helpers.helpers(res, response)
      } else {
        response.status = 201
        response.message = 'Product Image Has Been Edited'
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
