const { default: axios } = require('axios')
const chatService = require('../services/chat-service')
const destinationService = require('../services/destination-service')
const messageService = require('../services/message-service')
const webhookService = require('../services/webhook-service')

class AimController {
    async setWebhook(req, res) {
        const { url } = req.body
        console.log(url)
        webhookService.setWebhook(url)
    }

    async sendText(req, res) {
        const { userId, text } = req.body
        await messageService.addTextMessageFromClient(userId, text)
        res.status(200).send()
    }

    async sendFile(req, res) {
        const { userId, url } = req.body
        await messageService.addFileMessageFromClient(userId, url)
        res.status(200).send()
    }

    async closeChat(req, res) {
        const { userId } = req.body
        const text = 'Пользователь покинул чат'
        await messageService.addAlertMessageFromClient(userId, text)
        res.status(200).send()
    }

    async selectDestination(req, res) {
        const { userId, userName, attributes } = req.body

        const destinationId = attributes.site

        const destinations = destinationService
            .getDestination()
            .destinations.filter((dest) => {
                return dest.destinationId === destinationId
            })

        await axios.post(webhookService.getWebhook(destinationId), {
            id: destinationId,
            userId,
            type: 'SelectDestination',
            destination: {
                destinationId,
                name: destinations[0].name,
                hasOnline: destinations[0].hasOnline,
            },
        })

        await chatService.addChat(userId, destinationId, userName)

        res.status(200).send()
    }

    async getDestinations(req, res) {
        try {
            const destinations = destinationService.getDestination()
            console.log(destinations)
            res.json(destinations)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AimController()
