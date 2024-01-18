class userDto {
    id
    email
    firstName
    lastName

    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.firstName = model.first_name
        this.lastName = model.last_name
        this.destinationId = model.destination_id
        this.avatar = model.avatar
    }
}

module.exports = userDto
