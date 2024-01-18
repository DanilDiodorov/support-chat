const Router = require('express')
const router = new Router()

const userRouter = require('./user-router')
const chatRouter = require('./chat-router')
const messageRouter = require('./message-router')
const fileRouter = require('./file-router')

router.use('/user', userRouter)
router.use(chatRouter)
router.use(messageRouter)
router.use('/file/', fileRouter)

module.exports = router
