class ChatDto {
    id
    clientId
    operatorId
    clientName
    createdAt

    constructor(model) {
        this.id = model.id
        this.clientId = model.client_id
        this.operatorId = model.operator_id
        this.clientName = model.client_name
        this.createdAt = model.created_at
    }
}

module.exports = ChatDto
