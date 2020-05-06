const rentaller = require('../models').rentaller
const helpers = require('../helpers/response')
const bcrypt = require('bcryptjs')

module.exports = {
  registerRentaller: async (req, res) => {
    const response = {}
    try {
      const salt = bcrypt.genSaltSync(10)

      const data = await rentaller.create({
        fullname: req.body.fullname,
        rental_name: req.body.rental_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        address: req.body.address,
        phone_number: req.body.phone_number,
        id_card: req.body.id_card,
        image: 'photo.jpg'
      })
      if (data === undefined) {
        response.status = 203
        response.message = 'Data Not Found'
        helpers.helpers(res, response)
      } else {
        response.status = 200
        response.message = 'OK'
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
  loginRentaller: async (req, res) => {
    let response = {}
    try {
      const data = await rentaller.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!data) {
        response.status = 203
        response.message = 'Wrong Email'
        helpers.helpers(res, response)
      } else if (data) {
        const authorized = bcrypt.compareSync(req.body.password, data.dataValues.password)
        if (authorized) {
          data.dataValues.password = undefined
          response.status = 200
          response.message = 'Login Success'
          response.data = data.dataValues
          helpers.helpers(res, response)
        } else {
          response.status = 203
          response.message = 'Wrong Password'
          helpers.helpers(res, response)
        }
      }
    } catch (err) {
      response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      response.err = err
      helpers.helpers(res, response)
    }
  },

  getRentaller: async (req, res) => {
    let response = {}
    try {
      const data = await rentaller.findAll({})

      if (data.length === 0) {
        response.status = 203
        response.message = 'User List not Found!'
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
  detailRentaller: async (req, res) => {
    let response = {}
    try {
      const rentallerId = req.params.rentallerId
      const data = await rentaller.findOne({
        where: {
          id: rentallerId
        }
      })
      if (!data) {
        response.status = 203
        response.message = 'Detail Rentaller Tidak Ditemukan!'
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

  updateRentaller: async (req, res) => {
    let response = {}
    try {
      const rentallerId = req.params.rentallerId
      const body = req.body
      const [edit] = await rentaller.update(body, {
        where: {
          id: rentallerId
        }
      })
      const data = await rentaller.findOne({
        where: {
          id: rentallerId
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

  deleteRentaller: async (req, res) => {
    let response = {}
    try {
      const rentallerId = req.params.rentallerId
      const data = await rentaller.destroy({
        where: {
          id: rentallerId
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
