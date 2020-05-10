const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const { upload } = require('../helpers/upload')

router
  .post('/', upload.array('image', 5), ProductController.insertProduct)
  .get('/', ProductController.getProduct)
  .get('/:productId', ProductController.detailProduct)
  .patch('/:productId', ProductController.updateProduct)
  .patch('/uploadimage/:productId', upload.array('image', 5), ProductController.uploadImage)
  .delete('/:productId', ProductController.deleteProduct)

module.exports = router
