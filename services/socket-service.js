const onlineService = require('./online-service')

class SocketService {
    emitToOperator(operatorId, text, data) {
        if (onlineService.operators[operatorId]) {
            global.io
                .to(onlineService.operators[operatorId].socketId)
                .emit(text, data)
        }
    }
}

module.exports = new SocketService()
