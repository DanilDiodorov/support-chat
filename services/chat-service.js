const { default: axios } = require('axios')
const db = require('../db')
const ChatDto = require('../dtos/chat-dto')
const generateClientName = require('../utils/generate-client-name')
const messageService = require('./message-service')
const onlineService = require('./online-service')
const socketService = require('./socket-service')
const webhookService = require('./webhook-service')

class ChatService {
    async getChats(operatorId) {
        const query = await db.query(
            'SELECT * FROM chats WHERE operator_id=$1 AND is_closed=false',
            [operatorId]
        )

        const chats = query.rows.map((chat) => {
            return new ChatDto(chat)
        })

        return chats
    }

    async transferChat(chatId, targetOperatorId) {
        const query = await db.query(
            'UPDATE chats SET operator_id=$1 WHERE id=$2 RETURNING client_id',
            [targetOperatorId, chatId]
        )
        const clientId = query.rows[0].client_id
        onlineService.transferClient(clientId, targetOperatorId)
        socketService.emitToOperator(targetOperatorId, 'chat:transfer')
        return clientId
    }

    async getChatsId(operatorId) {
        const query = await db.query(
            'SELECT id FROM chats WHERE operator_id=$1',
            [operatorId]
        )

        return query.rows
    }

    async closeChat(
        chatId,
        clientId,
        operatorId,
        operatorFirstName,
        operatorLastName,
        operatorAvatarUrl,
        destinationId
    ) {
        const url = webhookService.getWebhook(destinationId)
        await db.query('UPDATE chats SET is_closed=true WHERE id=$1', [chatId])
        await axios.post(url, {
            id: 'asd',
            userId: clientId,
            type: 'Closed',
            employee: {
                employeeId: operatorId,
                firstName: operatorFirstName,
                lastName: operatorLastName,
                avatarUrl: operatorAvatarUrl,
            },
        })
        onlineService.removeClient(operatorId, clientId)
    }

    async addChat(clientId, destinationId, clientName) {
        let operatorId = onlineService.findOperator(destinationId)
        const candidateQuery = await db.query(
            'SELECT * FROM chats WHERE client_id=$1 AND is_closed=false',
            [clientId]
        )

        if (!operatorId) {
            const query = await db.query(
                'SELECT id FROM users WHERE destination_id=$1 ORDER BY RANDOM() LIMIT 1',
                [destinationId]
            )
            operatorId = query.rows[0]?.id
        }

        if (operatorId)
            if (candidateQuery.rows.length > 0) {
                const text = 'Пользователь присоединился к чату'
                messageService.addAlertMessageFromClient(clientId, text)
            } else {
                if (clientName.startsWith('ChatWidget')) {
                    clientName = generateClientName()
                }

                const query = await db.query(
                    'INSERT INTO chats (client_id, operator_id, client_name, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
                    [clientId, operatorId, clientName, Date.now()]
                )

                const chat = new ChatDto(query.rows[0])

                onlineService.addClient(operatorId, clientId, chat.id)
                socketService.emitToOperator(operatorId, 'chat:add', chat)
            }
    }

    async findChatByClientId(clientId) {
        const query = await db.query(
            'SELECT id, operator_id FROM chats WHERE client_id=$1',
            [clientId]
        )

        if (query.rows.length > 0) {
            return query.rows[0]
        } else {
            return null
        }
    }

    async getCount(operatorId) {
        const query = await db.query(
            'SELECT id, client_id FROM chats WHERE operator_id=$1 AND is_closed=false',
            [operatorId]
        )

        return query.rows
    }
}

module.exports = new ChatService()
