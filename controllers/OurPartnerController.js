const { ourPartner } = require('../models')
const helpers = require('../helpers/response')

module.exports = {
  insertPartner: async (req, res) => {
    const response = {}
    try {
      const input = req.body
      input.image = `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`
      const data = await ourPartner.create(input)
      if (data === undefined) {
        response.status = 400
        response.message = 'Input Invalid'

        helpers.helpers(res, response)
      } else {
        response.status = 201
        response.message = 'Partner Has Been Added'
        response.data = data

        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'

      helpers.helpers(res, response)
    }
  },

  getAllPartners: async (req, res) => {
    let response = {}
    try {
      const data = await ourPartner.findAll({})

      if (data.length === 0) {
        response.status = 404
        response.message = 'Partner not Found!'
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
  detailPartner: async (req, res) => {
    const response = {}
    try {
      const { partnerId } = req.params
      const data = await ourPartner.findOne({
        where: {
          id: partnerId
        }
      })
      if (data === null) {
        response.status = 404
        response.message = 'Partner not Found!'
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

  deletePartner: async (req, res) => {
    const response = {}
    try {
      const { partnerId } = req.params
      const data = await ourPartner.destroy({
        where: {
          id: partnerId
        }
      })
      if (data) {
        response.status = 200
        response.message = 'Successfullt Deleted!'
        response.data = data
        helpers.helpers(res, response)
      } else {
        response.status = 404
        response.message = 'Partner not Found!'
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
