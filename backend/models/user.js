import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false },
  genero: { type: DataTypes.STRING, allowNull: false },
  dataNascimento: { type: DataTypes.DATEONLY, allowNull: false },
  endereco: { type: DataTypes.STRING, allowNull: false },
}, {
  paranoid: true,
  timestamps: true,
});

export { User };
