const { validationResult } = require('express-validator')
const ApiError = require('../errors/api-error')
const userService = require('../services/user-service')
const getCookies = require('../utils/get-cookies')
const onlineService = require('../services/online-service')

const cookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
}

class UserController {
    async getUsers(req, res, next) {
        try {
            const { destinationId } = req.query
            const { id } = req.user
            const users = await userService.getUsers(destinationId, id)
            res.send({ users, online: Object.keys(onlineService.operators) })
        } catch (error) {
            next(error)
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.invalidInput())
            }
            const { email, firstName, lastName, password, destinationId } =
                req.body

            const user = await userService.registration(
                email,
                firstName,
                lastName,
                password,
                destinationId
            )

            res.cookie('refreshToken', user.refreshToken, cookieOptions).json(
                user
            )
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await userService.login(email, password)

            res.cookie('refreshToken', user.refreshToken, cookieOptions).json(
                user
            )
        } catch (error) {
            next(error)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = getCookies(req)
            const user = await userService.refresh(refreshToken)
            res.cookie('refreshToken', user.refreshToken, cookieOptions).json(
                user
            )
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = getCookies(req)
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken').send()
        } catch (error) {
            next(error)
        }
    }

    async changeUserData(req, res, next) {
        try {
            const { id } = req.user
            const { email, firstName, lastName, destinationId } = req.body
            await userService.changeUserData(
                id,
                email,
                firstName,
                lastName,
                destinationId
            )
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }

    async changePassword(req, res, next) {
        try {
            const { id } = req.user
            const { password } = req.body
            await userService.changePassword(id, password)
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }

    async changeProfilePhoto(req, res, next) {
        try {
            const { id } = req.user
            await userService.changeProfilePhoto(id, req.file)
            res.status(200).send()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()
