const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')

router
  .post('/', OrderController.insertOrder)
  .get('/', OrderController.getOrder)
  .get('/:orderId', OrderController.detailOrder)
  .patch('/:orderId', OrderController.updateOrder)
  .delete('/:orderId', OrderController.deleteOrder)

module.exports = router
