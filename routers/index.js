const express = require('express')

const router = express.Router()
const user = require('./user')
const rentaller = require('./rentaller')
const product = require('./product')
const ourPartner = require('./ourPartner')
const order = require('./order')
const carBrand = require('./carBrand')
const join = require('./join')

router
  .use('/user', user)
  .use('/rentaller', rentaller)
  .use('/product', product)
  .use('/ourpartner', ourPartner)
  .use('/order', order)
  .use('/carbrand', carBrand)
  .use('/', join)
  .get('/', function (req, res) {
    res.send({
      message: 'Welcome to CARRENT API',
      about: 'CARRENT APP v1',
      author: 'CARRENT Team',
      thanks: 'Thanks to visit our API'
    })
  })

module.exports = router
