import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';  
import dotenv from 'dotenv';
import { sequelize } from './config/database.js'; 

dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(express.json());
app.use(cors(corsOptions));  // Usando o CORS com opções personalizadas

// Definindo as rotas para usuários
app.use('/users', userRoutes);

// Sincronizando o banco de dados
sequelize.sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(8800, () => {
      console.log("Servidor rodando na porta 8800");
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados: ", err);
    process.exit(1);  // Fechar o processo caso haja erro na sincronização
  });
