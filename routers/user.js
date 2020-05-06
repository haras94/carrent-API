const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router
  .post('/register', UserController.registerUser)
  .post('/login', UserController.loginUser)
  .get('/', UserController.getUser)
  .get('/:userId', UserController.detailUser)
  .patch('/:userId', UserController.updateUser)
  .delete('/:userId', UserController.deleteUser)

module.exports = router
