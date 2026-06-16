const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas de produtos exigem autenticação
router.use(authMiddleware);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Listar todos os produtos
 *     description: Retorna uma lista de todos os produtos cadastrados no sistema
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60d5ec49f1b2c72b8c8e4a1b
 *                   nome:
 *                     type: string
 *                     example: Notebook Dell
 *                   descricao:
 *                     type: string
 *                     example: Notebook de alta performance
 *                   preco:
 *                     type: number
 *                     example: 2499.99
 *                   estoque:
 *                     type: number
 *                     example: 10
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', produtoController.listarTodos);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     description: Retorna os detalhes de um produto específico pelo seu ID
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do produto
 *         example: 60d5ec49f1b2c72b8c8e4a1b
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d5ec49f1b2c72b8c8e4a1b
 *                 nome:
 *                   type: string
 *                   example: Notebook Dell
 *                 descricao:
 *                   type: string
 *                   example: Notebook de alta performance
 *                 preco:
 *                   type: number
 *                   example: 2499.99
 *                 estoque:
 *                   type: number
 *                   example: 10
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', produtoController.buscarPorId);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Criar novo produto
 *     description: Cria um novo produto no catálogo
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Notebook Dell
 *               descricao:
 *                 type: string
 *                 example: Notebook de alta performance
 *               preco:
 *                 type: number
 *                 example: 2499.99
 *               estoque:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto criado com sucesso
 *                 produto:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     descricao:
 *                       type: string
 *                     preco:
 *                       type: number
 *                     estoque:
 *                       type: number
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', produtoController.criar);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualizar produto
 *     description: Atualiza os dados de um produto existente
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do produto
 *         example: 60d5ec49f1b2c72b8c8e4a1b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Notebook Dell Atualizado
 *               descricao:
 *                 type: string
 *                 example: Notebook de alta performance atualizado
 *               preco:
 *                 type: number
 *                 example: 2299.99
 *               estoque:
 *                 type: number
 *                 example: 15
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto atualizado com sucesso
 *                 produto:
 *                   type: object
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', produtoController.atualizar);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deletar produto
 *     description: Remove um produto do catálogo
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do produto
 *         example: 60d5ec49f1b2c72b8c8e4a1b
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', produtoController.deletar);

module.exports = router;