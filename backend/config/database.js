import { Sequelize } from 'sequelize';
import fs from 'fs';

const configJson = fs.readFileSync('./config/config.json', 'utf8');
const config = JSON.parse(configJson);

export default config;


// Definindo o ambiente (development, test ou production)
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env]; // Pega as configurações específicas para o ambiente atual

// Instanciando o Sequelize com as configurações do arquivo config.json
const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,  
});

export { sequelize };
