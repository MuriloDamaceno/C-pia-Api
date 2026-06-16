const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar novo usuário
 *     description: Cria uma nova conta de usuário no sistema
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             - nome
 *             - email
 *             - senha
 *           properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário registrado com sucesso
 *                 usuarioId:
 *                   type: string
 *       400:
 *         description: Email já existe ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/registrar', authController.registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login
 *     description: Autentica um usuário e retorna um token JWT
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Email ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email ou senha inválidos
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', authController.login);

module.exports = router;
