const { user, gender, status } = require('../models')
const role = require('../models').role
const helpers = require('../helpers/response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const mail = require('../helpers/mailUser')
require('dotenv').config()

module.exports = {
  registerUser: async (req, res) => {
    const response = {}
    try {
      const salt = bcrypt.genSaltSync(10)
      const users = await user.findOne({
        where: {
          email: req.body.email
        }
      })
      if (users) {
        response.status = 203
        response.message = 'Email anda sudah terdaftar'
        helpers.helpers(res, response)
      } else {
        const data = await user.create({
          fullname: req.body.fullname,
          address: req.body.address,
          phone_number: req.body.phone_number,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
          id_card: req.body.id_card,
          gender: req.body.gender,
          image: req.body.image,
          rentaller_id: 0,
          role_id: 0,
          status: 0
        })
        if (data === undefined) {
          response.status = 203
          response.message = 'Data Tidak Ditemukan'
          helpers.helpers(res, response)
        } else {
          const encrypt = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET_KEY)
          const dataEmail = {
            email: data.email,
            fullname: data.fullname,
            encrypt
          }
          mail.send(dataEmail)
          response.status = 201
          response.message = 'Account Has Been Created'
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
  loginUser: async (req, res) => {
    let response = {}
    try {
      const data = await user.findOne({
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
          response.message = 'Password Salah'
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

  getUser: async (req, res) => {
    let response = {}
    try {
      const search = req.query.search
      if (search) {
        const data = await user.findAll({
          where: {
            [Op.or]: [
              { fullname: { [Op.substring]: search } }
            ]
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [{
            model: gender,
            as: 'genderName',
            attributes: ['name']
          },
          {
            model: status,
            as: 'isActive',
            attributes: ['isActived']
          },
          {
            model: role,
            as: 'roleName',
            attributes: ['role']
          }]
        })
        if (data.length === 0) {
          response.status = 404
          response.message = 'User List not Found!'
          helpers.helpers(res, response)
        } else {
          response.status = 200
          response.message = 'OK!'
          response.data = data
          helpers.helpers(res, response)
        }
      } else {
        const data = await user.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [{
            model: gender,
            as: 'genderName',
            attributes: ['name']
          },
          {
            model: status,
            as: 'isActive',
            attributes: ['isActived']
          },
          {
            model: role,
            as: 'roleName',
            attributes: ['role']
          }]
        })
        if (data.length === 0) {
          response.status = 404
          response.message = 'User List not Found!'
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
  detailUser: async (req, res) => {
    let response = {}
    try {
      const userId = req.params.userId

      const data = await user.findOne({
        where: {
          id: userId
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: gender,
          as: 'genderName',
          attributes: ['name']
        },
        {
          model: status,
          as: 'isActive',
          attributes: ['isActived']
        },
        {
          model: role,
          as: 'roleName',
          attributes: ['role']
        }]
      })
      if (!data) {
        response.status = 203
        response.message = 'Detail User Tidak Ditemukan!'
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

  updateUser: async (req, res) => {
    let response = {}
    try {
      const userId = req.params.userId
      const body = req.body
      console.log(req.body)
      const [edit] = await user.update(body,
        {
          where: {
            id: userId
          }
        })
      const data = await user.findOne({
        where: {
          id: userId
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
      const userId = req.params.userId
      const salt = bcrypt.genSaltSync(10)
      const [edit] = await user.update({
        password: bcrypt.hashSync(req.body.password, salt)
      },
      {
        where: {
          id: userId
        }
      })
      const data = await user.findOne({
        where: {
          id: userId
        }
      })
      if (edit === 1) {
        response.status = 200
        response.message = 'Reset Password Success!'
        response.data = data
        helpers.helpers(res, response)
      } if (edit === 0) {
        response.status = 404
        response.message = 'Data Not Found'
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
      const { userId } = req.params
      const [edit] = await user.update({ image: `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}` },
        {
          where: {
            id: userId
          }
        })
      const data = await user.findOne({
        where: {
          id: userId
        }
      })
      if (edit === 1) {
        response.status = 200
        response.message = 'Profile Successfully Edited!'
        response.data = data
        helpers.helpers(res, response)
      } if (edit === 0) {
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
  deleteUser: async (req, res) => {
    let response = {}
    try {
      const userId = req.params.userId
      const data = await user.destroy({
        where: {
          id: userId
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
  userAuth: async (req, res) => {
    const response = {}
    try {
      const token = req.query.encrypt
      const userId = jwt.verify(token, process.env.SECRET_KEY).id
      const [edit] = await user.update({
        status: 1
      },
      {
        where: {
          id: userId
        }
      })
      const data = await user.findOne({
        where: {
          id: userId
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
      const response = {}
      response.status = 500
      response.message = 'Internal Server Error'
      helpers.helpers(res, response)
    }
  }
}
