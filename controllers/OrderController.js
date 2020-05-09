const { order } = require('../models')
const helpers = require('../helpers/response')

module.exports = {
  insertOrder: async (req, res) => {
    const response = {}
    try {
      const { body } = req
      const data = await order.create(body)
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

  getOrder: async (req, res) => {
    let response = {}
    try {
      const data = await order.findAll({})
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
      response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  detailOrder: async (req, res) => {
    let response = {}
    try {
      const { orderId } = req.params
      const data = await order.findOne({
        where: {
          id: orderId
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
      response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },
  updateOrder: async (req, res) => {
    let response = {}
    try {
      const { orderId } = req.params
      const { body } = req
      const [edit] = await order.update(body, {
        where: {
          id: orderId
        }
      })
      const data = await order.findOne({
        where: {
          id: orderId
        }
      })
      if (edit === 1) {
        response.status = 201
        response.message = 'User Successfully Edited'
        response.data = data
        helpers.helpers(res, response)
      } if (edit === 0) {
        response.status = 404
        response.message = 'Data Not Found'
        helpers.helpers(res, response)
      }
    } catch (err) {
      response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      helpers.helpers(res, response)
    }
  },
  deleteOrder: async (req, res) => {
    let response = {}
    try {
      const { orderId } = req.params
      const data = await order.destroy({
        where: {
          id: orderId
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
      response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  }
}
