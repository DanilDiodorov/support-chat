const Router = require('express')
const chatController = require('../controllers/chat-controller')
const authMiddleware = require('../middleware/auth-middleware')
const router = new Router()

router.get('/chat', authMiddleware, chatController.getChats)
router.post('/chat-close', authMiddleware, chatController.closeChat)
router.patch('/chat-transfer', authMiddleware, chatController.transferChat)

module.exports = router
