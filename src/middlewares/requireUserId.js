// Middleware que exige token válido (bearer) e header x-user-id correspondente
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const userIdHeader = req.headers['x-user-id'] || req.headers['x_user_id'] || req.body.userId || req.body.user_id;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // decoded should contain id
        const tokenUserId = decoded.id;

        if (!userIdHeader) {
            return res.status(401).json({ mensagem: 'Cabeçalho x-user-id ausente' });
        }

        // Normalize types
        const suppliedId = String(userIdHeader);
        const tokenId = String(tokenUserId);

        if (suppliedId !== tokenId) {
            return res.status(403).json({ mensagem: 'ID do usuário não corresponde ao token' });
        }

        // Optional: verify user exists in DB
        const usuario = await Usuario.findById(tokenUserId);
        if (!usuario) return res.status(401).json({ mensagem: 'Usuário inválido' });

        req.usuarioId = tokenUserId;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
};
