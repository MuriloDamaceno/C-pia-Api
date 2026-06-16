const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: [true, 'Nome é obrigatório'] },
    email: { type: String, required: [true, 'Email é obrigatório'], unique: true },
    senha: { type: String, required: [true, 'Senha é obrigatória'] }
});

usuarioSchema.pre('save', async function () {
    if (!this.isModified('senha')) return;
    this.senha = await bcrypt.hash(this.senha, 10);
});

module.exports = mongoose.model('Usuario', usuarioSchema);