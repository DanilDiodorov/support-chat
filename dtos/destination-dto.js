class DestinationDto {
    destinationId
    name
    hasOnline

    constructor(model) {
        this.destinationId = model.id
        this.name = model.name
        this.hasOnline = model.has_online
    }
}

module.exports = DestinationDto
