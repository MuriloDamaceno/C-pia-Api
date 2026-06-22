const Categoria = require('../models/categoriaModel');

class CategoriaController {
    async criar(req, res) {
        try {
            const { nome } = req.body;
            if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });

            const id = await Categoria.criar(nome);
            return res.status(201).json({ id, nome });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async listar(req, res) {
        try {
            const rows = await Categoria.buscarTodas();
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const cat = await Categoria.buscarPorId(id);
            if (!cat) return res.status(404).json({ erro: 'Categoria não encontrada' });
            return res.status(200).json(cat);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });

            const atualizado = await Categoria.atualizar(id, nome);
            if (!atualizado) return res.status(404).json({ erro: 'Categoria não encontrada' });
            return res.status(200).json({ mensagem: 'Categoria atualizada' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const deletado = await Categoria.deletar(id);
            if (!deletado) return res.status(404).json({ erro: 'Categoria não encontrada' });
            return res.status(200).json({ mensagem: 'Categoria removida' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = new CategoriaController();
