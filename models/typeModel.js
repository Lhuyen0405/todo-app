const { pool } = require('../config/db');

class Type {
    static async create(typeData) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO type (name, description) VALUES (?, ?)',
                [typeData.name, typeData.description]
            );
            return {
                id: result.insertId,
                name: typeData.name,
                description: typeData.description,
            };
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await pool.execute('SELECT * FROM type');
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Type;