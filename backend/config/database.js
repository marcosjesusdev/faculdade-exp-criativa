import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do .env
dotenv.config();

// Configuração do Sequelize usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306, // Adiciona a porta, caso esteja diferente do padrão
    logging: false, // Desativa logs do Sequelize (opcional)
  }
);

export { sequelize };
