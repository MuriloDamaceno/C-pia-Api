Catálogo de Produtos API

API RESTful para gerenciamento de catálogo de produtos, com autenticação JWT e documentação Swagger.

Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- Swagger UI

Funcionalidades Principais

- [x] Registro de usuário com criptografia de senha
- [x] Login com emissão de token JWT
- [x] CRUD completo de produtos
- [x] Rotas protegidas por autenticação
- [x] Filtros de busca por nome e categoria
- [x] Documentação interativa com Swagger

  Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

  Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/MuriloDamaceno/catalogo-produtos-api.git
```

2. Acesse a pasta do projeto:

```bash
cd catalogo-produtos-api
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` usando o `.env.example` como base:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/catalogo-produtos
JWT_SECRET=sua_chave_secreta
```

5. Inicie a aplicação:

```bash
node app.js
```

6. Abra no navegador:

```text
http://localhost:3000
```

 Documentação da API

Com o servidor em execução, acesse:

```text
http://localhost:3000/api-docs
```

Lá você encontra todas as rotas, modelos de requisição e respostas.

 Autenticação

Registrar usuário

`POST /auth/registrar`

Corpo da requisição:

```json
{
  "nome": "Seu Nome",
  "email": "seu@email.com",
  "senha": "suasenha"
}
```

Login

`POST /auth/login`

Corpo da requisição:

```json
{
  "email": "seu@email.com",
  "senha": "suasenha"
}
```

Usar token

Inclua o token no cabeçalho de autorização das rotas protegidas:

```text
Authorization: Bearer <TOKEN>
```

 Endpoints Principais

Autenticação

| Método | Rota | Descrição | Requer Token |
|--------|------|-----------|--------------|
| POST | `/auth/registrar` | Registrar novo usuário | Não |
| POST | `/auth/login` | Login e recebimento de token | Não |

Produtos

| Método | Rota | Descrição | Requer Token |
|--------|------|-----------|--------------|
| GET | `/produtos` | Listar todos os produtos | Sim |
| GET | `/produtos/:id` | Buscar produto por ID | Sim |
| GET | `/produtos?nome=x` | Filtrar produtos por nome | Sim |
| GET | `/produtos?categoria=x` | Filtrar por categoria | Sim |
| POST | `/produtos` | Criar novo produto | Sim |
| PUT | `/produtos/:id` | Atualizar produto | Sim |
| DELETE | `/produtos/:id` | Excluir produto | Sim |

Exemplo de Produto

```json
{
  "nome": "Teclado Mecânico",
  "preco": 250.0,
  "descricao": "Teclado mecânico RGB",
  "categoria": "Periféricos",
  "estoque": 10
}
```

Estrutura do Projeto

```
catalogo-produtos-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
├── .env.example
├── app.js
└── package.json
```

Boas Práticas

- Mantenha o `README.md` atualizado sempre que adicionar novas rotas ou variáveis de ambiente.
- Use exemplos de payload reais para facilitar o uso da API.
- Deixe a documentação Swagger sempre disponível para testes rápidos.

Autor

- Murilo Damaceno - Desenvolvimento Back-end

---

> Projeto preparado para ser testado localmente com MongoDB e documentação Swagger.

