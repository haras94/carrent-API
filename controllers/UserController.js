const user = require('../models').user
const gender = require('../models').gender
const status = require('../models').status
const role = require('../models').role
const helpers = require('../helpers/response')
const bcrypt = require('bcryptjs')

module.exports = {
  registerUser: async (req, res) => {
    const response = {}
    try {
      const salt = bcrypt.genSaltSync(10)

      const data = await user.create({
        fullname: req.body.fullname,
        address: req.body.address,
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        id_card: req.body.id_card,
        gender: req.body.gender,
        image: 'photo.jpg',
        rentaller_id: 0,
        role_id: 0,
        status: 0
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
  loginUser: async (req, res) => {
    let response = {}
    try {
      const data = await user.findOne({
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

  getUser: async (req, res) => {
    let response = {}
    try {
      const data = await user.findAll({
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
      // const salt = bcrypt.genSaltSync(10)
      const userId = req.params.userId
      // const password = bcrypt.hashSync(req.body.password, salt)
      const body = req.body
      // body = Object.assign(body, { password })
      // console.log(body)
      const [edit] = await user.update(body, {
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
  }
}
