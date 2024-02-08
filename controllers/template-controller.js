const templateService = require('../services/template-service')

class TemplateController {
    async create(req, res, next) {
        try {
            const { id } = req.user
            const { text } = req.body
            await templateService.create(id, text)
            res.send()
        } catch (error) {
            next(error)
        }
    }
    async get(req, res, next) {
        try {
            const { id } = req.user
            const templates = await templateService.get(id)
            res.send(templates)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const { id, text } = req.body
            await templateService.update(id, text)
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.query
            await templateService.delete(id)
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TemplateController()
