const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { upload } = require('../helpers/upload')

router
  .post('/register', UserController.registerUser)
  .post('/login', UserController.loginUser)
  .get('/', UserController.getUser)
  .get('/auth/', UserController.userAuth)
  .get('/:userId', UserController.detailUser)
  .patch('/:userId', UserController.updateUser)
  .patch('/upload/:userId', upload.single('image'), UserController.uploadImage)
  .patch('/resetpassword/:userId', UserController.resetPassword)
  .delete('/:userId', UserController.deleteUser)

module.exports = router
