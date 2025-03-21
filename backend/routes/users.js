import express from 'express';
import * as usersController from '../controllers/users.js';

const router = express.Router();

// Rota para buscar todos os usuários
router.get('/', usersController.getUsers);

// Rota para criar um novo usuário
router.post('/', usersController.createUser);

// Rota para login
router.post('/login', usersController.loginUser);

export default router;
