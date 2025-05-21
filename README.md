<div align="center">

# LinkGrid API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/raphaeleliass/linkgrid-api?style=social)](https://github.com/raphaeleliass/linkgrid-api/stargazers)

<em style="display: block; margin: 1rem auto; max-width: 600px; color: #666">
API para gerenciamento de perfis de usuário e links personalizados, permitindo criar, editar e remover links associados a cada usuário. Ideal para aplicações de bio-link, portfólios e redes sociais.
</em>

</div>

---

<p style="font-size: 1.6rem; margin-top: 4rem">🔧 Pré-requisitos</p>

- Node.js >= 18
- PostgreSQL
- pnpm (ou npm/yarn)

<p style="font-size: 1.6rem; margin-top: 4rem">⚙️ Instalação</p>

```bash
# Clone o repositório
git clone https://github.com/raphaeleliass/linkgrid-api

# Navegue até o diretório
cd linkgrid-api

# Instale as dependências
pnpm install

# Edite o arquivo .env com as informações do seu banco PostgreSQL
cp .env

# Rode as migrations do Prisma
pnpm prisma migrate deploy
```

> 🎉 **Pronto para começar!**

---

<p style="font-size: 1.6rem; margin-top: 4rem">💡 Executando o Projeto</p>

```bash
pnpm dev
```

<p style="font-size: 1.6rem; margin-top: 4rem">✨ Exemplos de Uso</p>

```bash
# Criar usuário
POST /api/users/create

# Autenticar usuário
POST /api/users/session

# Criar link
POST /api/links/create

# Atualizar link
PUT /api/links/update

# Remover link
DELETE /api/links/delete
```

---

<p style="font-size: 1.6rem; margin-top: 4rem">🌟 Principais Funcionalidades</p>

- Cadastro e autenticação de usuários
- Criação, edição e remoção de links personalizados
- Associação de múltiplos links a um usuário
- Validação de dados com Zod
- Segurança com JWT, Helmet e Rate Limit

<p style="font-size: 1.6rem; margin-top: 4rem">📚 Links Úteis</p>

> [📚 Documentação da API](https://documenter.getpostman.com/view/45102119/2sB2qZFhmn)

---
<p style="font-size: 1.6rem; margin-top: 4rem">🛠️ Tecnologias Utilizadas</p>

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- JWT
- Helmet
- Cors
- Rate Limit
---

<p style="font-size: 1.6rem; margin-top: 4rem">👥 Autores</p>

👤 Raphael


