const express = require('express')
const router = express.Router()
const RentallerController = require('../controllers/RentallerController')
const { upload } = require('../helpers/upload')

router
  .post('/register', RentallerController.registerRentaller)
  .post('/login', RentallerController.loginRentaller)
  .get('/', RentallerController.getRentaller)
  .get('/auth/', RentallerController.rentallerAuth)
  .get('/:rentallerId', RentallerController.detailRentaller)
  .patch('/:rentallerId', RentallerController.updateRentaller)
  .patch('/upload/:rentallerId', upload.single('image'), RentallerController.uploadImage)
  .patch('/resetpassword/:rentallerId', RentallerController.resetPassword)
  .delete('/:rentallerId', RentallerController.deleteRentaller)

module.exports = router
