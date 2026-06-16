const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome do produto é obrigatório']
    },
    descricao: {
        type: String,
        default: 'Sem descrição'
    },
    preco: {
        type: Number,
        required: [true, 'O preço é obrigatório']
    },
    categoria: {
        type: String,
        default: 'Geral'
    },
    estoque: {
        type: Number,
        default: 0
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Produto', produtoSchema);