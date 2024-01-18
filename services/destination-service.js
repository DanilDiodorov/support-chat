const DestinationDto = require('../dtos/destination-dto')
const onlineService = require('./online-service')
const fs = require('fs')

class DestinationService {
    filePath = './config/destinations.json'

    getDestination() {
        const destinationFile = fs.readFileSync(this.filePath)
        const destinations = JSON.parse(destinationFile).destinations

        const newDestinations = []

        console.log(destinations)

        for (let destinationId in destinations) {
            const newDestination = {}
            newDestination.has_online = false
            newDestination.id = destinationId
            newDestination.name = destinations[destinationId].name
            for (let key in onlineService.operators) {
                if (
                    onlineService.operators[key].destinationId.toString() ===
                    newDestination.id.toString()
                ) {
                    newDestination.has_online = true
                    break
                }
            }
            newDestinations.push(new DestinationDto(newDestination))
        }

        return { destinations: newDestinations }
    }
}

module.exports = new DestinationService()
