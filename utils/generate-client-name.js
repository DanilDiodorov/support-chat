const generateClientName = () => {
    const colors = [
        'Зелёный',
        'Красный',
        'Синий',
        'Жёлтый',
        'Чёрный',
        'Серый',
        'Розовый',
        'Фиолетовый',
        'Оранжевый',
        'Серебряный',
        'Золотой',
        'Коричневый',
        'Бирюзовый',
        'Салатовый',
        'Персиковый',
        'Голубой',
        'Малиновый',
        'Лиловый',
    ]
    const animals = [
        'Дракон',
        'Бобр',
        'Лев',
        'Тигр',
        'Заяц',
        'Волк',
        'Кит',
        'Сурикат',
        'Бык',
        'Петух',
        'Олень',
        'Слон',
        'Жираф',
        'Медведь',
        'Крокодил',
        'Горилла',
        'Буйвол',
        'Баран',
        'Лось',
        'Гепард',
        'Щенок',
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
    return randomColor + ' ' + randomAnimal
}

module.exports = generateClientName
