# Makefile para facilitar instalação, migração e execução do projeto

.PHONY: install migrate start-backend start-frontend all

# Instala dependências do backend e do frontend
install:
	cd backend && npm install
	cd ../frontend && npm install

# Executa as migrações do banco de dados
migrate:
	cd backend && npx sequelize db:migrate

# Inicia o servidor backend
start-backend:
	cd backend && npm run dev

# Inicia o servidor frontend
start-frontend:
	cd frontend && npm run dev

# Tudo junto: instala dependências e migra banco
all: install migrate
	@echo "Instalação e migração concluídas. Agora use 'make start-backend' e 'make start-frontend' em terminais separados para rodar o projeto."
