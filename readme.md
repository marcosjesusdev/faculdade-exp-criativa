# Documentação do Projeto

## Sobre o Projeto
Este projeto consiste em um sistema de CRUD de usuários, utilizando **React (Vite) e Tailwind CSS** no frontend, e **Node.js com Sequelize e MySQL** no backend.

## Tecnologias Utilizadas

### Frontend:
- React com Vite
- Tailwind CSS
- Fetch API para comunicação com o backend

### Backend:
- Node.js
- Express.js
- Sequelize (ORM para MySQL)
- Bcrypt para criptografia de senhas
- Dotenv para gerenciamento de variáveis de ambiente

---

# ⚡️ INSTALAÇÃO - WINDOWS

## Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://dev.mysql.com/downloads/mysql/) instalado

## Passo a passo

### 1. Clonar o repositório
```sh
git clone git@github.com:marcosjesusdev/faculdade-exp-criativa.git
cd faculdade-exp-criativa
```

### 2. Instalar dependências manualmente

**Backend:**
```sh
cd backend
npm install
```

**Frontend:**
```sh
cd ../frontend
npm install
```

### 3. Configurar o Banco de Dados
- Crie um banco no MySQL.
- Importe o arquivo `backend/database/dump.sql`.
- Configure o arquivo `backend/.env`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_DIALECT=mysql
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

- (Opcional) Configure também o `frontend/.env`:
```env
VITE_API_URL=http://localhost:8800
```

### 4. Rodar o Backend e Frontend

**Backend:**
```sh
cd backend
npm start
```

**Frontend:**
```sh
cd frontend
npm run dev
```

---
# ⚡️ INSTALAÇÃO - LINUX/MAC

## Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://dev.mysql.com/downloads/mysql/) instalado
- `make` instalado (já vem instalado no MacOS e na maioria dos Linux)

## Passo a passo

### 1. Clonar o repositório
```sh
git clone git@github.com:marcosjesusdev/faculdade-exp-criativa.git
cd faculdade-exp-criativa
```

### 2. Utilizar Makefile para automação

**Instalar dependências e rodar migrações:**
```sh
make install
make migrate
```

### 3. Configurar Variáveis de Ambiente

**Backend (`backend/.env`):**
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_DIALECT=mysql
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

**Frontend (`frontend/.env`) (opcional):**
```env
VITE_API_URL=http://localhost:8800
```

### 4. Rodar o Backend e Frontend

**Backend:**
```sh
make start-backend
```

**Frontend:**
```sh
make start-frontend
```

**Ou, para fazer tudo de uma vez (instalação + migração):**
```sh
make all
```

---

# 📚 Rotas Disponíveis

### Backend (`/backend/routes/users.js`):
| Método | Rota                | Descrição                         |
|--------|---------------------|-----------------------------------|
| GET    | /users               | Buscar todos os usuários         |
| POST   | /users               | Criar um novo usuário            |
| POST   | /users/login         | Login de usuário                 |
| PUT    | /users/:id           | Atualizar usuário pelo ID        |
| DELETE | /users/:id           | Deletar usuário pelo ID          |

> Base URL: `http://localhost:8800/users`

---

### Frontend (`/frontend/src/pages/`):
| Caminho | Componente         | Descrição                         |
|---------|--------------------|-----------------------------------|
| /login  | Login               | Tela de login de usuários         |
| /register | Register          | Tela de cadastro de novos usuários|
| /listar-usuarios | ListUsers   | Tela de listagem de usuários      |

> O frontend roda em `http://localhost:5173`.

---

# 🏗️ Estrutura do Projeto
```
faculdade-exp-criativa/
│── backend/           # Código do servidor Node.js
│   ├── models/        # Modelos do Sequelize
│   ├── controllers/   # Controladores das rotas
│   ├── routes/        # Definição de rotas
│   ├── config/        # Configuração do banco de dados
│   ├── .env           # Variáveis de ambiente
│   └── server.js      # Arquivo principal do servidor
│
│── frontend/          # Código do aplicativo React
│   ├── src/           # Código fonte
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas do sistema
│   ├── .env           # (Opcional) Variáveis de ambiente
│   └── main.jsx       # Entrada do aplicativo React
│
│── README.md          # Documentação do projeto
│── Makefile           # Automação de instalação e execução
│── .gitignore         # Arquivos ignorados pelo Git
```

---

# 🗄️ Banco de Dados

- Banco de dados: **MySQL**.
- Tabela `users` contém:
  - `id` (chave primária)
  - `name`
  - `email`
  - `password`
  - `cpf`
  - `genero`
  - `dataNascimento`
  - `telefone`
  - `createdAt`
  - `updatedAt`

- Importe o banco através do arquivo:
  ```
  backend/database/dump.sql
  ```

---



# 🚀 Pronto para usar!
