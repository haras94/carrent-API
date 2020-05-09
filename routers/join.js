const express = require('express')
const router = express.Router()
const JoinController = require('../controllers/JoinController')

router
  .get('/imagedetail', JoinController.getImageDetail)
  .get('/transmission', JoinController.getTransmission)
  .get('/baggagecapacity', JoinController.getBaggageCapacity)
  .get('/fueltype', JoinController.getfuelType)
  .get('/enginecapacity', JoinController.getEngineCapacity)
  .get('/additionaldriver', JoinController.getAdditionalDriver)
  .get('/personcapacity', JoinController.getPersonCapacity)
  .get('/doors', JoinController.getAllDoors)
  .get('/manufacturingyear', JoinController.getManufacturingYear)
  .get('/avgfuelconsumption', JoinController.getAvgFuelConsumption)
  .get('/srsairbag', JoinController.getSrsAirbag)

module.exports = router
