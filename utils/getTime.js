const getTime = () => {
    const now = new Date()
    const hours = now.getHours()
    let minutes = now.getMinutes()

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    return hours + ':' + minutes
}

module.exports = getTime
