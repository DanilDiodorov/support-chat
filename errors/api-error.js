class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static badRequest(message, errors = []) {
        return new ApiError(404, message, errors)
    }

    static accountAlreadyExists() {
        return new ApiError(404, 'Пользователь уже существует')
    }

    static invalidInput() {
        return new ApiError(400, 'Недопустимые входные данные в запросе')
    }

    static userDoesntExist() {
        return new ApiError(404, 'Пользователь не найден')
    }

    static authenticationError() {
        return new ApiError(403, 'Ошибка авторизации')
    }
}

module.exports = ApiError
