const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const requireUserId = require('../middlewares/requireUserId');

// Todas as rotas de categorias exigem token + x-user-id
router.post('/', requireUserId, categoriaController.criar.bind(categoriaController));
router.get('/', requireUserId, categoriaController.listar.bind(categoriaController));
router.get('/:id', requireUserId, categoriaController.buscarPorId.bind(categoriaController));
router.put('/:id', requireUserId, categoriaController.atualizar.bind(categoriaController));
router.delete('/:id', requireUserId, categoriaController.deletar.bind(categoriaController));

module.exports = router;
