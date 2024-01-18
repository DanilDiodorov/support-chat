export const getTime = (date) => {
    const now = new Date(date)
    const hours = now.getHours()
    let minutes = now.getMinutes()

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    return hours + ':' + minutes
}
