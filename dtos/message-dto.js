class MessageDto {
    id
    chatId
    text
    createdAt
    url
    type
    isOperator
    isRead

    constructor(model) {
        this.id = model.id
        this.chatId = model.chat_id
        this.text = model.text
        this.createdAt = model.created_at
        this.url = model.url
        this.type = model.type
        this.isOperator = model.is_operator
        this.isRead = model.is_read
    }
}

module.exports = MessageDto
