/* eslint-disable no-unused-vars */
const { product, imageDetail } = require('../models')
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
      const setLimit = parseInt(req.query.limit, 10) || 2
      const offset = null
      const setOffset = (page * setLimit) - setLimit
      const limit = setLimit + setOffset
      const path = `http://${req.get('host') + req.baseUrl}?page`
      const { search } = req.query
      const include = [
        {
          model: imageDetail,
          as: 'images',
          attributes: ['image']
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
            { title: { [Op.substring]: search } }
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
  }
}
