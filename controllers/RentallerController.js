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
    } catch (err) {

    }
  }
}
