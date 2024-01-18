export const convertToCSSColor = (adjective) => {
    switch (adjective) {
        case 'Зелёный':
            return 'green'
        case 'Красный':
            return 'red'
        case 'Синий':
            return 'blue'
        case 'Жёлтый':
            return '#F2BC2C'
        case 'Чёрный':
            return 'black'
        case 'Серый':
            return 'gray'
        case 'Розовый':
            return 'pink'
        case 'Фиолетовый':
            return 'purple'
        case 'Оранжевый':
            return 'orange'
        case 'Серебряный':
            return 'silver'
        case 'Золотой':
            return 'gold'
        case 'Коричневый':
            return 'brown'
        case 'Бирюзовый':
            return 'turquoise'
        case 'Салатовый':
            return 'lime'
        case 'Персиковый':
            return '#F7AFAA'
        case 'Голубой':
            return 'skyblue'
        case 'Малиновый':
            return 'crimson'
        case 'Лиловый':
            return '#CBBAE3'
        default:
            return 'grey'
    }
}
