const Router = require('express')
const router = new Router()
const { body } = require('express-validator')
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 30 }),
    userController.registration
)
router.post('/login', userController.login)
router.get('/refresh', userController.refresh)
router.get('/logout', userController.logout)
router.get('/users', authMiddleware, userController.getUsers)
router.patch('/data', authMiddleware, userController.changeUserData)
router.patch('/password', authMiddleware, userController.changePassword)
router.post(
    '/photo',
    authMiddleware,
    upload.single('file'),
    userController.changeProfilePhoto
)

module.exports = router
