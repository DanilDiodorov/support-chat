const Router = require('express')
const fileController = require('../controllers/file-controller')
const router = new Router()

router.get('/image', fileController.sendImage)

module.exports = router
