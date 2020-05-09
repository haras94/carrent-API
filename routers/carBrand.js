const express = require('express')
const router = express.Router()
const CarBrandController = require('../controllers/carBrandController')

router
  .post('/', CarBrandController.insertCarBrand)
  .get('/', CarBrandController.getCarBrand)
  .get('/:carBrandId', CarBrandController.detailCarBrand)
  .patch('/:carBrandId', CarBrandController.updateCarBrand)
  .delete('/:carBrandId', CarBrandController.deleteCarBrand)

module.exports = router
