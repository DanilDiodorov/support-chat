const Router = require('express')
const router = new Router()
const aimController = require('./../controllers/aim-controller')

router.post('/setWebhook', aimController.setWebhook)

router.post('/sendText', aimController.sendText)

router.post('/sendFile', aimController.sendFile)

router.post('/closeChat', aimController.closeChat)

router.post('/selectDestination', aimController.selectDestination)

router.get('/getDestinations', aimController.getDestinations)

module.exports = router
