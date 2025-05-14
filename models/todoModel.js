const { pool } = require('../config/db');

class Todo {
    static async create(todoData) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO todo (content, description, type, isDone) VALUES (?, ?, ?, FALSE)',
                [todoData.content, todoData.description, todoData.type]
            );
            return {
                id: result.insertId,
                content: todoData.content,
                description: todoData.description,
                type: todoData.type,
                isDone: false,
            };
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await pool.execute('SELECT * FROM todo');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updates) {
        try {
            const [result] = await pool.execute(
                'UPDATE todo SET isDone = ? WHERE id = ?',
                [updates.isDone, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Todo;