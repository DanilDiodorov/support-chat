const chatService = require('../services/chat-service')
const onlineService = require('../services/online-service')

global.operators = {}

const initSocket = () => {
    global.io.on('connection', async (socket) => {
        const { operatorId, destinationId } = socket.handshake.query

        const clients = await chatService.getCount(operatorId)
        onlineService.addOperator(operatorId, socket.id, clients, destinationId)

        console.log(onlineService.operators)

        socket.on('disconnect', () => {
            console.log('disconnected')
            onlineService.deleteOperator(operatorId)
        })
    })
}

module.exports = initSocket
