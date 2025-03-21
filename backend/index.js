import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';  // Roteamento para usuários
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';  // Importando a instância do sequelize

dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env

const app = express();

// Configuração do CORS (com possibilidade de personalizar as permissões)
const corsOptions = {
  origin: '*', // Permite requisições de qualquer origem (ajuste conforme necessário)
  methods: 'GET,POST,PUT,DELETE', // Garante que todas as requisições sejam aceitas
  allowedHeaders: 'Content-Type,Authorization', // Inclui headers importantes
};

app.use(express.json());
app.use(cors(corsOptions));  // Usando o CORS com opções personalizadas

// Definindo as rotas para usuários (incluindo login, já configurado no arquivo users.js)
app.use('/users', userRoutes);  // Rota de usuários

// Sincronização do banco de dados
sequelize.sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
    // Após a sincronização, iniciamos o servidor
    app.listen(8800, () => {
      console.log("Servidor rodando na porta 8800");
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados: ", err);
    process.exit(1);  // Fechar o processo caso haja erro na sincronização
  });
