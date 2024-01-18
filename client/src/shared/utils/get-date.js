export const getDate = (date) => {
    const now = new Date(date)
    let day = now.getDate()
    let month = now.getMonth() + 1
    const year = now.getFullYear()

    if (day < 10) {
        day = '0' + day
    }

    if (month < 10) {
        month = '0' + month
    }

    return day + '.' + month + '.' + year
}
