const pool = require('../../config/database');
const bcrypt = require('bcryptjs');

class UsuarioModel {
    static async findByEmail(email) {
        const sql = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
        const [rows] = await pool.execute(sql, [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async findById(id) {
        const sql = 'SELECT * FROM usuarios WHERE id = ? LIMIT 1';
        const [rows] = await pool.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async create({ nome, email, senha }) {
        const hash = await bcrypt.hash(senha, 10);
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        const [result] = await pool.execute(sql, [nome, email, hash]);
        return { id: result.insertId, nome, email };
    }
}

module.exports = UsuarioModel;