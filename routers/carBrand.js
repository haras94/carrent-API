const express = require('express')
const router = express.Router()
const CarBrandController = require('../controllers/carBrandController')

router
  .post('/', CarBrandController.insertCarBrand)
  .get('/', CarBrandController.getCarBrand)
  .get('/:orderId', CarBrandController.detailCarBrand)
  .patch('/:orderId', CarBrandController.updateCarBrand)
  .delete('/:orderId', CarBrandController.deleteCarBrand)

module.exports = router
