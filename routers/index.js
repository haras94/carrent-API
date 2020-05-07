const express = require('express')

const router = express.Router()
const user = require('./user')
const rentaller = require('./rentaller')
const product = require('./product')

router
  .use('/user', user)
  .use('/rentaller', rentaller)
  .use('/product', product)
  .get('/', function (req, res) {
    res.send({
      message: 'Welcome to CARRENT API',
      about: 'CARRENT APP v1',
      author: 'CARRENT Team',
      thanks: 'Thanks to visit our API'
    })
  })

module.exports = router
