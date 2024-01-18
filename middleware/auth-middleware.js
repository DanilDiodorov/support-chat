const ApiError = require('../errors/api-error')
const tokenService = require('../services/token-service')
const getCookies = require('../utils/get-cookies')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const { refreshToken } = getCookies(req)

        if (!refreshToken) {
            next(ApiError.authenticationError())
        }

        const decoded = tokenService.validateRefreshToken(refreshToken)

        req.user = decoded

        next()
    } catch (err) {
        next(ApiError.authenticationError())
    }
}
