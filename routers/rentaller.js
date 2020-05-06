const express = require('express')
const router = express.Router()
const RentallerController = require('../controllers/RentallerController')

router
  .post('/register', RentallerController.registerRentaller)
  .post('/login', RentallerController.loginRentaller)
  .get('/', RentallerController.getRentaller)
  .get('/:rentallerId', RentallerController.detailRentaller)
  .patch('/:rentallerId', RentallerController.updateRentaller)
  .delete('/:rentallerId', RentallerController.deleteRentaller)

module.exports = router
