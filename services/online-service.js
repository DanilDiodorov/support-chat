class OnlineService {
    operators = {}

    addOperator(operatorId, socketId, clients, destinationId) {
        this.operators[operatorId] = {}
        this.operators[operatorId].socketId = socketId
        this.operators[operatorId].clients = {}
        clients.forEach((client) => {
            this.operators[operatorId].clients[client.client_id] = client.id
        })
        this.operators[operatorId].destinationId = destinationId
    }

    deleteOperator(operatorId) {
        delete this.operators[operatorId]
        console.log(this.operators)
    }

    addClient(operatorId, clientId, chatId) {
        if (this.operators[operatorId])
            this.operators[operatorId].clients[clientId] = chatId
        console.log(this.operators)
    }

    removeClient(operatorId, clientId) {
        if (this.operators[operatorId])
            delete this.operators[operatorId].clients[clientId]
        console.log(this.operators)
    }

    getClientData(clientId) {
        for (let operatorId in this.operators) {
            if (this.operators[operatorId].clients.hasOwnProperty(clientId))
                return {
                    operator_id: operatorId,
                    id: this.operators[operatorId].clients[clientId],
                }
        }
        return null
    }

    transferClient(clientId, targetOperatorId) {
        const operator = this.getClientData(clientId)
        if (operator) {
            const operatorId = operator.operator_id
            const chatId = this.operators[operatorId].clients[clientId]
            this.removeClient(operatorId, clientId)
            this.addClient(targetOperatorId, clientId, chatId)
        }
        console.log(this.operators)
    }

    findOperator(destId) {
        let minKey = null
        let minCount = 1000

        for (const key in this.operators) {
            const clientsCount = Object.keys(this.operators[key].clients).length
            const destinationId = this.operators[key].destinationId
            if (
                clientsCount < minCount &&
                destinationId === destId.toString()
            ) {
                minKey = key
                minCount = clientsCount
            }
        }

        return minKey
    }
}

module.exports = new OnlineService()
