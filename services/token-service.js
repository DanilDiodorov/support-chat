const jwt = require('jsonwebtoken')
const { classToPlain } = require('class-transformer')
const db = require('../db')
require('dotenv').config()

class TokenService {
    generateTokens(payload) {
        const plained = classToPlain(payload)
        const accessToken = jwt.sign(plained, process.env.JWT_ACCESS_KEY, {
            expiresIn: process.env.JWT_ACCESS_KEY_EXPIRE_IN,
        })
        const refreshToken = jwt.sign(plained, process.env.JWT_REFRESH_KEY, {
            expiresIn: process.env.JWT_REFRESH_KEY_EXPIRE_IN,
        })

        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(uid, refreshToken) {
        const query = await db.query('SELECT * FROM tokens WHERE uid=$1', [uid])

        const tokenData = query.rows

        if (tokenData.length === 0) {
            await db.query(
                'INSERT INTO tokens (uid, refreshtoken)  VALUES ($1, $2)',
                [uid, refreshToken]
            )
        } else {
            await db.query('UPDATE tokens SET refreshtoken=$2 WHERE uid=$1', [
                uid,
                refreshToken,
            ])
        }
    }

    async removeToken(refreshToken) {
        await db.query(
            `DELETE FROM tokens WHERE refreshtoken='${refreshToken}'`
        )
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
        return userData
    }

    async findToken(refreshToken) {
        const query = await db.query(
            `SELECT * FROM tokens WHERE refreshtoken='${refreshToken}'`
        )

        return query.rows
    }
}

module.exports = new TokenService()
