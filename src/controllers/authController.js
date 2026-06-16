const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
        }

        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const usuario = await Usuario.create({ nome, email, senha });

        res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: usuario._id });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ mensagem: 'Dados inválidos ao registrar', erro: error.message });
        }
        res.status(500).json({ mensagem: 'Erro ao registrar', erro: error.message });
    }
};  

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
    }
};