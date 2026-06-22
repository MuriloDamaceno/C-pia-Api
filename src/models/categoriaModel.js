const pool = require('../../config/database');

class CategoriaModel {
    static async criar(nome) {
        const sql = 'INSERT INTO categorias (nome) VALUES (?)';
        const [result] = await pool.execute(sql, [nome]);
        return result.insertId;
    }

    static async buscarTodas() {
        const sql = 'SELECT id_categoria AS id, nome FROM categorias';
        const [rows] = await pool.execute(sql);
        return rows;
    }

    static async buscarPorId(id) {
        const sql = 'SELECT id_categoria AS id, nome FROM categorias WHERE id_categoria = ? LIMIT 1';
        const [rows] = await pool.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async atualizar(id, nome) {
        const sql = 'UPDATE categorias SET nome = ? WHERE id_categoria = ?';
        const [result] = await pool.execute(sql, [nome, id]);
        return result.affectedRows > 0;
    }

    static async deletar(id) {
        const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
        const [result] = await pool.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = CategoriaModel;
