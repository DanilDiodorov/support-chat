const db = require('../db')
const { v4: uuidv4 } = require('uuid')
const socketService = require('./socket-service')
const MessageDto = require('../dtos/message-dto')
const { default: axios } = require('axios')
const webhookService = require('./webhook-service')
const onlineService = require('./online-service')
require('dotenv').config()

class MessageService {
    async getMessages(operatorId) {
        const query = await db.query(
            'SELECT id FROM chats WHERE operator_id=$1 AND is_closed=false',
            [operatorId]
        )

        const chatsId = query.rows

        if (chatsId.length > 0) {
            const ids = []

            chatsId.forEach((chat) => {
                ids.push(chat.id)
            })

            const placeholders = ids.join(', ')

            const query = await db.query(
                `SELECT * FROM messages WHERE chat_id IN (${placeholders}) ORDER BY created_at`
            )

            const messages = query.rows.map((message) => {
                return new MessageDto(message)
            })

            return messages
        } else {
            return []
        }
    }

    async addTextMessageFromClient(clientId, text) {
        let chat = onlineService.getClientData(clientId)

        if (!chat) {
            const query = await db.query(
                'SELECT id, operator_id FROM chats WHERE client_id=$1 AND is_closed=false',
                [clientId]
            )
            chat = query.rows.length > 0 ? query.rows[0] : null
        }

        if (chat) {
            const id = uuidv4()
            const createdAt = Date.now()
            const type = 'text'
            const isOperator = false
            db.query(
                'INSERT INTO messages (id, chat_id, text, created_at, type, is_operator) VALUES ($1, $2, $3, $4, $5, $6)',
                [id, chat.id, text, createdAt, type, isOperator]
            )

            const newMessage = {
                id,
                text,
                chatId: chat.id,
                createdAt,
                type,
                isRead: false,
                isOperator,
            }

            socketService.emitToOperator(
                chat.operator_id.toString(),
                'message:add',
                newMessage
            )
        }
    }

    async addFileMessageFromClient(clientId, url) {
        let chat = onlineService.getClientData(clientId)

        if (!chat) {
            const query = await db.query(
                'SELECT id, operator_id FROM chats WHERE client_id=$1 AND is_closed=false',
                [clientId]
            )
            chat = query.rows.length > 0 ? query.rows[0] : null
        }

        if (chat) {
            const id = uuidv4()
            const createdAt = Date.now()
            const type = 'file'
            const isOperator = false
            db.query(
                'INSERT INTO messages (id, chat_id, url, created_at, type, is_operator) VALUES ($1, $2, $3, $4, $5, $6)',
                [id, chat.id, url, createdAt, type, isOperator]
            )

            const newMessage = {
                id,
                url,
                chatId: chat.id,
                createdAt,
                type,
                isRead: false,
                isOperator,
            }

            socketService.emitToOperator(
                chat.operator_id.toString(),
                'message:add',
                newMessage
            )
        }
    }

    async addAlertMessageFromClient(clientId, text) {
        let chat = onlineService.getClientData(clientId)

        if (!chat) {
            const query = await db.query(
                'SELECT id, operator_id FROM chats WHERE client_id=$1 AND is_closed=false',
                [clientId]
            )
            chat = query.rows.length > 0 ? query.rows[0] : null
        }

        if (chat) {
            const id = uuidv4()
            const createdAt = Date.now()
            const type = 'alert'
            const isOperator = false
            db.query(
                'INSERT INTO messages (id, chat_id, text, created_at, type, is_operator) VALUES ($1, $2, $3, $4, $5, $6)',
                [id, chat.id, text, createdAt, type, isOperator]
            )

            const newMessage = {
                id,
                text,
                chatId: chat.id,
                createdAt,
                type,
                isRead: false,
                isOperator,
            }

            socketService.emitToOperator(
                chat.operator_id.toString(),
                'message:add',
                newMessage
            )
        }
    }

    async addTextMessageFromOperator(
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
    ) {
        const url = webhookService.getWebhook(destinationId)

        await axios.post(url, {
            id,
            userId: clientId,
            type: 'TextMessage',
            text,
            employee: {
                employeeId: operatorId,
                firstName: operatorFirstName,
                lastName: operatorLastName,
                avatarUrl: `${process.env.CLIENT_URL}/file/image`,
            },
        })

        await db.query(
            'INSERT INTO messages (id, chat_id, text, created_at, type, is_operator, is_read) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id, chatId, text, createdAt, type, isOperator, true]
        )
    }

    async setIsRead(ids) {
        const placeholders = ids.map((id) => `'${id}'`).join(', ')
        await db.query(
            `UPDATE messages SET is_read=true WHERE id IN (${placeholders})`
        )
    }
}

module.exports = new MessageService()
