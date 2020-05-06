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
  }
}
