const fs = require('fs')

class WebhookService {
    filePath = './config/production.json'
    destinationsFilePath = './config/destinations.json'

    setWebhook(url) {
        const newWebhook = {
            url,
        }
        fs.writeFileSync(this.filePath, JSON.stringify(newWebhook))
    }

    getWebhook(destinationId) {
        const webhook = fs.readFileSync(this.destinationsFilePath)
        return JSON.parse(webhook).destinations[destinationId].url
    }
}

module.exports = new WebhookService()
