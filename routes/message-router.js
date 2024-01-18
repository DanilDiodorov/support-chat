const Router = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const messageController = require('../controllers/message-controller')
const router = new Router()

router.get('/message', authMiddleware, messageController.getMessages)
router.post('/message', authMiddleware, messageController.addMessage)
router.patch('/message', authMiddleware, messageController.setIsRead)

module.exports = router
