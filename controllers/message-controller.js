const messageService = require('../services/message-service')

class MessageController {
    async getMessages(req, res, next) {
        try {
            const { id } = req.user
            const messages = await messageService.getMessages(id)
            res.json(messages)
        } catch (error) {
            next(error)
        }
    }

    async addMessage(req, res, next) {
        try {
            const {
                id,
                chatId,
                operatorId,
                operatorFirstName,
                operatorLastName,
                clientId,
                text,
                createdAt,
                type,
                isOperator,
            } = req.body
            const { destinationId } = req.user

            messageService.addTextMessageFromOperator(
                id,
                chatId,
                operatorId,
                operatorFirstName,
                operatorLastName,
                clientId,
                text,
                createdAt,
                type,
                isOperator,
                destinationId
            )
            res.status(200).send()
        } catch (error) {
            console.log(error)
        }
    }

    async setIsRead(req, res, next) {
        try {
            const { ids } = req.body
            await messageService.setIsRead(ids)
            res.status(200).send()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new MessageController()
