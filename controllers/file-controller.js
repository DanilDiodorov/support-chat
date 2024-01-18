const path = require('path')

class FileController {
    async sendImage(req, res, next) {
        try {
            const { id } = req.query
            const imagePath = path.join(
                __dirname,
                `../assets/images/users/${id}.png`
            )
            res.sendFile(imagePath)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FileController()
