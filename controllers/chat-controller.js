const chatService = require('../services/chat-service')
const messageService = require('../services/message-service')

class ChatController {
    async getChats(req, res, next) {
        try {
            const { id } = req.user
            const chat = await chatService.getChats(id)
            return res.json(chat)
        } catch (error) {
            next(error)
        }
    }

    async transferChat(req, res, next) {
        try {
            const {
                chatId,
                targetOperatorId,
                operatorFullName,
                targetOperatorFullName,
            } = req.body
            const clientId = await chatService.transferChat(
                chatId,
                targetOperatorId
            )
            const text =
                'Переведено от: ' +
                operatorFullName +
                ' кому: ' +
                targetOperatorFullName
            await messageService.addAlertMessageFromClient(clientId, text)
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }

    async closeChat(req, res, next) {
        try {
            const {
                chatId,
                clientId,
                operatorId,
                operatorFirstName,
                operatorLastName,
                operatorAvatarUrl,
            } = req.body
            const { destinationId } = req.user
            await chatService.closeChat(
                chatId,
                clientId,
                operatorId,
                operatorFirstName,
                operatorLastName,
                operatorAvatarUrl,
                destinationId
            )
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ChatController()
