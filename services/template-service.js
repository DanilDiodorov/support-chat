const db = require('../db')

class TemplateService {
    async create(userId, text) {
        await db.query(
            'INSERT INTO templates (user_id, text) VALUES ($1, $2)',
            [userId, text]
        )
    }
    async get(userId) {
        const query = await db.query(
            'SELECT * FROM templates WHERE user_id=$1 ORDER BY id',
            [userId]
        )
        return query.rows
    }

    async update(id, text) {
        await db.query('UPDATE templates SET text=$1 WHERE id=$2', [text, id])
    }

    async delete(id) {
        await db.query('DELETE FROM templates WHERE id=$1', [id])
    }
}

module.exports = new TemplateService()
