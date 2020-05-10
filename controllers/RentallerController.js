const { rentaller, status } = require('../models')
const helpers = require('../helpers/response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mail = require('../helpers/mailRentaller')
const { Op } = require('sequelize')

module.exports = {
  registerRentaller: async (req, res) => {
    const response = {}
    try {
      const salt = bcrypt.genSaltSync(10)
      const rentallers = await rentaller.findOne({
        where: {
          email: req.body.email
        }
      })
      if (rentallers) {
        response.status = 203
        response.message = 'Email anda sudah terdaftar'
        helpers.helpers(res, response)
      } else {
        const data = await rentaller.create({
          fullname: req.body.fullname,
          rental_name: req.body.rental_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
          address: req.body.address,
          phone_number: req.body.phone_number,
          id_card: req.body.id_card,
          image: req.body.image,
          status: 0
        })
        if (data === undefined) {
          response.status = 203
          response.message = 'Data Tidak Ditemukan'
          helpers.helpers(res, response)
        } else {
          const encrypt = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET_KEY)
          const dataEmail = {
            email: 'maniskntl71@gmail.com',
            rental_name: data.rental_name,
            encrypt
          }
          mail.send(dataEmail)
          response.status = 200
          response.message = 'OK'
          response.data = data
          helpers.helpers(res, response)
        }
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
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          email: req.body.email
        }
      })
      if (!data) {
        response.status = 203
        response.message = 'Email Salah'
        helpers.helpers(res, response)
      } else if (data) {
        const authorized = bcrypt.compareSync(req.body.password, data.dataValues.password)
        if (authorized) {
          const token = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET_KEY)
          data.dataValues.password = undefined
          data.dataValues.token = token
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
      const search = req.query.search
      if (search) {
        const data = await rentaller.findAll({
          where: {
            [Op.or]: [
              { fullname: { [Op.substring]: search } }
            ]
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [{
            model: status,
            as: 'isActivated',
            attributes: ['name']
          }]
        })
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
      } else {
        const data = await rentaller.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [{
            model: status,
            as: 'isActivated',
            attributes: ['isActived']
          }]
        })
        if (data.length === 0) {
          response.status = 203
          response.message = 'Rentaller List not Found!'
          helpers.helpers(res, response)
        } else {
          response.status = 200
          response.message = 'OK!'
          response.data = data
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
  detailRentaller: async (req, res) => {
    let response = {}
    try {
      const rentallerId = req.params.rentallerId
      const data = await rentaller.findOne({
        where: {
          id: rentallerId
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: status,
          as: 'isActivated',
          attributes: ['isActived']
        }]
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

  resetPassword: async (req, res) => {
    const response = {}
    try {
      const { rentallerId } = req.params
      const salt = bcrypt.genSaltSync(10)
      const [edit] = await rentaller.update({
        password: bcrypt.hashSync(req.body.password, salt)
      },
      {
        where: {
          id: rentallerId
        }
      })
      const data = await rentaller.findOne({
        where: {
          id: rentallerId
        }
      })
      if (edit === 0) {
        response.status = 404
        response.message = 'Data Not Found'
        helpers.helpers(res, response)
      } if (edit === 1) {
        response.status = 200
        response.message = 'Reset Password Success!'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      response.status = 500
      response.message = 'Internal Server Error'
      helpers.helpers(res, response)
    }
  },

  uploadImage: async (req, res) => {
    const response = {}
    try {
      const { rentallerId } = req.params
      const [edit] = await rentaller.update({ image: `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}` },
        {
          where: {
            id: rentallerId
          }
        })
      const data = await rentaller.findOne({
        where: {
          id: rentallerId
        }
      })
      console.log(rentallerId)
      if (edit === 1) {
        response.status = 200
        response.message = 'Profile Successfully Edited!'
        response.data = data
        helpers.helpers(res, response)
      } else if (edit === 0) {
        response.status = 203
        response.message = 'Data Not Found'
        helpers.helpers(res, response)
      }
    } catch (err) {
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
  },
  rentallerAuth: async (req, res) => {
    const response = {}
    try {
      const token = req.query.encrypt
      const rentallerId = jwt.verify(token, process.env.SECRET_KEY).id
      const [edit] = await rentaller.update({
        status: 1
      },
      {
        where: {
          id: rentallerId
        }
      })
      const data = await rentaller.findOne({
        where: {
          id: rentallerId
        }
      })
      console.log(data)
      if (edit === 0) {
        response.status = 203
        response.message = 'Data Not Found'
        helpers.helpers(res, response)
      } if (edit === 1) {
        response.status = 201
        response.message = 'Password berhasil diganti'
        response.data = data
        helpers.helpers(res, response)
      }
    } catch (err) {
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      helpers.helpers(res, response)
    }
  }
}
