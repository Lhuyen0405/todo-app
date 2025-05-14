const { pool } = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    static async findByUsername(username) {
        try {
            const [rows] = await pool.execute('SELECT * FROM user WHERE username = ?', [username]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.execute('SELECT id, username, email FROM user WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const [result] = await pool.execute(
                'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
                [userData.username, userData.email, hashedPassword]
            );
            return {
                id: result.insertId,
                username: userData.username,
                email: userData.email,
            };
        } catch (error) {
            throw error;
        }
    }

    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = User;