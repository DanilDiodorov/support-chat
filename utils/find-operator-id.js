const findOperatorId = (obj, destId) => {
    let minKey = null
    let minCount = 1000

    for (const key in obj) {
        const clientsCount = obj[key].clientsCount
        const destinationId = obj[key].destinationId
        if (clientsCount < minCount && destinationId === destId.toString()) {
            minKey = key
            minCount = clientsCount
        }
    }

    return minKey
}

module.exports = findOperatorId
