const express = require('express')
const router = express.Router()
const OurPartnerController = require('../controllers/OurPartnerController')
const { upload } = require('../helpers/upload')

router
  .post('/', upload.single('partner_image'), OurPartnerController.insertPartner)
  .get('/', OurPartnerController.getAllPartners)
  .get('/:partnerId', OurPartnerController.detailPartner)
//   .patch('/:partnerId', OurPartnerController.updatePartner)
  .delete('/:partnerId', OurPartnerController.deletePartner)

module.exports = router
