const Router = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const templateController = require('../controllers/template-controller')
const router = new Router()

router.post('/create', authMiddleware, templateController.create)
router.get('/get', authMiddleware, templateController.get)
router.patch('/update', authMiddleware, templateController.update)
router.delete('/delete', authMiddleware, templateController.delete)

module.exports = router
