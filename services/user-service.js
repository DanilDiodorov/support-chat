const db = require('../db')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const tokenService = require('./token-service')
const ApiError = require('../errors/api-error')
const fs = require('fs')
const path = require('path')

class UserService {
    async getUsers(destinationId, id) {
        const query = await db.query(
            'SELECT * FROM users WHERE destination_id=$1 AND id!=$2',
            [destinationId, id]
        )

        const users = query.rows.map((user) => new UserDto(user))

        return users
    }

    async registration(email, firstName, lastName, password, destinationId) {
        const candidate = await db.query(
            'SELECT id FROM users WHERE email=$1',
            [email]
        )

        if (candidate.rows.length > 0) {
            throw ApiError.accountAlreadyExists()
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const userQuery = await db.query(
            'INSERT INTO users (email, first_name, last_name, password, destination_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, firstName, lastName, hashPassword, destinationId]
        )

        const userDto = new UserDto(userQuery.rows[0])

        const jwtTokens = tokenService.generateTokens(userDto)

        await tokenService.saveToken(userDto.id, jwtTokens.refreshToken)

        return {
            ...jwtTokens,
            user: userDto,
        }
    }

    async login(email, password) {
        const candidate = await db.query('SELECT * FROM users WHERE email=$1', [
            email,
        ])

        if (candidate.rows.length === 0) {
            throw ApiError.userDoesntExist()
        }

        const comparePassword = bcrypt.compareSync(
            password,
            candidate.rows[0].password
        )

        const userDto = new UserDto(candidate.rows[0])

        if (!comparePassword) {
            throw ApiError.userDoesntExist()
        }

        const jwtTokens = tokenService.generateTokens(userDto)

        await tokenService.saveToken(userDto.id, jwtTokens.refreshToken)

        return {
            ...jwtTokens,
            user: userDto,
        }
    }

    async refresh(refreshToken) {
        const candidate = tokenService.validateRefreshToken(refreshToken)

        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!candidate || tokenFromDB.length === 0) {
            throw ApiError.authenticationError()
        }

        const userQuery = await db.query('SELECT * FROM users WHERE email=$1', [
            candidate.email,
        ])

        const userDto = new UserDto(userQuery.rows[0])
        const jwtTokens = tokenService.generateTokens(userDto)

        await tokenService.saveToken(userDto.id, jwtTokens.refreshToken)

        return {
            ...jwtTokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken)
    }

    async changeUserData(id, email, firstName, lastName, destinationId) {
        await db.query(
            'UPDATE users SET email=$1, first_name=$2, last_name=$3, destination_id=$4 WHERE id=$5',
            [email, firstName, lastName, destinationId, id]
        )
    }

    async changePassword(id, password) {
        const hashPassword = await bcrypt.hash(password, 5)
        await db.query('UPDATE users SET password=$1 WHERE id=$2', [
            hashPassword,
            id,
        ])
    }

    async changeProfilePhoto(id, file) {
        const filePath = __dirname + '/../assets/images/users/' + id + '.png'

        await db.query('UPDATE users SET avatar=true WHERE id=$1', [id])

        await new Promise((resolve) => {
            fs.rename(file.path, filePath, (err) => {
                if (err) {
                    throw ApiError.invalidInput()
                } else {
                    resolve()
                }
            })
        })
    }

    async deleteProfilePhoto(id) {
        // const filePath = path.join(
        //     __dirname,
        //     '/../assets/images/users/' + id + '.png'
        // )
        await db.query('UPDATE users SET avatar=false WHERE id=$1', [id])

        // console.log(filePath)

        // try {
        //     fs.unlink(filePath)
        //     console.log(`File ${filePath} has been deleted.`)
        // } catch (err) {
        //     throw err
        // }
    }
}

module.exports = new UserService()
