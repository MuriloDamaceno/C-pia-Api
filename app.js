require('dotenv').config();
const express = require('express');
const conectarDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao banco
conectarDB();

// Middlewares
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Catálogo de Produtos API',
      version: '1.0.0',
      description: 'API REST profissional para gerenciamento de produtos com autenticação',
      contact: {
        name: 'Suporte API',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./app.js', './src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Endpoint de teste
 *     description: Retorna uma mensagem de boas-vindas para verificar se a API está funcionando
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Olá, mundo!
 */
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Olá, mundo!' });
});

// Rotas
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});

