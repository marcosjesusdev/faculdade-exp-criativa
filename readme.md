# Documentação do Projeto

## Sobre o Projeto
Este projeto consiste em um sistema de cadastro e listagem de usuários, utilizando **React (Vite) e Tailwind CSS** no frontend, e **Node.js com Sequelize e MySQL** no backend.

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

## Instalação e Configuração

### 1. Clonar o repositório
```sh
git clone git@github.com:marcosjesusdev/faculdade-exp-criativa.git
cd faculdade-exp-criativa
```

### 2. Utilizando Makefile para facilitar a configuração (opcional e recomendado)

#### Instalar dependências (backend e frontend) e rodar migrações:
```sh
make install
make migrate
```

#### Iniciar os servidores:
Em dois terminais separados:

Terminal 1 (Backend):
```sh
make start-backend
```
Terminal 2 (Frontend):
```sh
make start-frontend
```

#### Comando resumido:
```sh
make all
```
> Esse comando faz a instalação e a migração, depois basta iniciar o backend e frontend manualmente.

### 3. Configurar Variáveis de Ambiente

#### Backend (`backend/.env`):
Crie um arquivo `.env` com o seguinte conteúdo:

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_DIALECT=mysql
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

#### Frontend (`frontend/.env`) *(opcional)*:
```env
VITE_API_URL=http://localhost:8800
```

---

## Rotas Disponíveis

### Backend (`/backend/routes/users.js`):
| Método | Rota                | Descrição                         |
|--------|---------------------|-----------------------------------|
| GET    | /users               | Buscar todos os usuários         |
| POST   | /users               | Criar um novo usuário            |
| POST   | /users/login         | Login de usuário                 |
| PUT    | /users/:id           | Atualizar usuário pelo ID        |
| DELETE | /users/:id           | Deletar usuário pelo ID          |

> Todas essas rotas são baseadas em `http://localhost:8800/users`.

---

### Frontend (`/frontend/src/pages/`):
| Caminho | Componente         | Descrição                         |
|---------|--------------------|-----------------------------------|
| /login  | Login               | Tela de login de usuários         |
| /register | Register          | Tela de cadastro de novos usuários|
| /listar-usuarios | ListUsers   | Tela de listagem de usuários      |

> O frontend roda em `http://localhost:5173`.

---

## Estrutura do Projeto
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

## Banco de Dados
- Banco de dados MySQL.
- A tabela `users` contém campos como:
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

- O banco pode ser importado através do arquivo `backend/database/dump.sql` (exportação do banco).

---

## 📋 Makefile para Automação
Arquivo `Makefile` que pode ser usado para facilitar o processo de instalação e execução:

```makefile
.PHONY: install migrate start-backend start-frontend all

# Instala dependências do backend e frontend
install:
	cd backend && npm install
	cd ../frontend && npm install

# Executa as migrações do banco de dados
migrate:
	cd backend && npx sequelize-cli db:migrate

# Inicia o servidor backend
start-backend:
	cd backend && npm run dev

# Inicia o servidor frontend
start-frontend:
	cd frontend && npm run dev

# Tudo junto: instala, migra e deixa pronto para rodar
all: install migrate
	@echo "Use 'make start-backend' e 'make start-frontend' em terminais separados."
```

---

# 🚀 Pronto para usar!

---
