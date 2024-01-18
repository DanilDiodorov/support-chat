const { Pool } = require('pg')
require('dotenv').config()

class Db {
    pool

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        })
    }

    async query(text, params, callback) {
        return this.pool.query(text, params, callback)
    }
}

module.exports = new Db()
