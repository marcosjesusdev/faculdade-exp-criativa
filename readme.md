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

### 2. Configurar o Backend
```sh
cd backend
npm install
```

#### Criar o arquivo `.env` no diretório `backend/`
Crie um arquivo `.env` na pasta `backend/` e configure as variáveis de ambiente:

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_DIALECT=mysql
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

O arquivo de configuração do banco agora usa `config.js` para carregar essas variáveis de ambiente.

Depois, rode as migrações do banco de dados:
```sh
npx sequelize db:migrate
```

Para iniciar o servidor backend:
```sh
npm run dev
```
O backend rodará em `http://localhost:8800`.

### 3. Configurar o Frontend
```sh
cd ../frontend
npm install
```
Se quiser adicionar um `.env` no frontend (opcional), crie o arquivo `frontend/.env` e adicione:
```
VITE_API_URL=http://localhost:8800
```

Para iniciar o frontend:
```sh
npm run dev
```
O frontend rodará em `http://localhost:5173`.

## Uso do Sistema
1. **Cadastro**: O usuário pode se cadastrar informando nome, e-mail e senha.
2. **Login**: O usuário pode fazer login com e-mail e senha.
3. **Listagem de Usuários**: Após logar, o usuário tem acesso à lista de usuários cadastrados.
4. **Edição/Exclusão**: É possível editar ou excluir usuários cadastrados.

## Estrutura do Projeto
```
faculdade-exp-criativa/
│── backend/           # Código do servidor Node.js
│   ├── models/        # Modelos do Sequelize
│   ├── controllers/   # Controladores das rotas
│   ├── routes/        # Definição de rotas
│   ├── config/        # Configuração do banco de dados (config.js)
│   ├── .env           # Configuração de variáveis de ambiente
│   └── server.js      # Arquivo principal do servidor
│
│── frontend/          # Código do aplicativo React
│   ├── src/           # Código fonte
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas do sistema
│   ├── .env           # (Opcional) Configuração de ambiente
│   └── main.jsx       # Arquivo principal do React
│
│── README.md          # Documentação do projeto
│── .gitignore         # Arquivos ignorados pelo Git
```