const router = require('express').Router()
const postCtrl = require('../../controllers/postCtrl')
const { verifyAccessToken, verifyRefreshToken } = require("../../middleware/auth")

router.post('/', verifyAccessToken, postCtrl.create)
router.patch('/:id', verifyAccessToken, postCtrl.update)
router.delete('/:id', verifyAccessToken, postCtrl.delete)

router.get('/', verifyAccessToken, postCtrl.findAll)
router.get('/:id', verifyAccessToken, postCtrl.findOne)

module.exports = router
