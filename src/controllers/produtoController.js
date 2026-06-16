const Produto = require('../models/produtoModel');

// LISTAR TODOS
exports.listarTodos = async (req, res) => {
    try {
        const { nome, categoria } = req.query;
        let filtro = {};

        if (nome) {
            filtro.nome = { $regex: nome, $options: 'i' };
        }
        if (categoria) {
            filtro.categoria = { $regex: categoria, $options: 'i' };
        }

        const produtos = await Produto.find(filtro);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar produtos', erro: error.message });
    }
};

// BUSCAR POR ID
exports.buscarPorId = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: error.message });
    }
};

// CRIAR
exports.criar = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao criar produto', erro: error.message });
    }
};

// ATUALIZAR
exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao atualizar produto', erro: error.message });
    }
};

// DELETAR
exports.deletar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar produto', erro: error.message });
    }
};