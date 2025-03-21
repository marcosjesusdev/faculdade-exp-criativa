import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Para gerar o token de autenticação

// Função para buscar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Encontrando todos os usuários
    return res.json(users); // Retornando a lista de usuários
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

// Função para criar um novo usuário
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({
        message: "Nome, email, senha e confirmação de senha são obrigatórios!",
      });
  }

  // Verificar se a senha e a confirmação de senha são iguais
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem!" });
  }

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já registrado!" });
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(password, 10); // Criptografando a senha com 10 rounds

    // Criando um novo usuário no banco com a senha criptografada
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Salvando a senha criptografada
    });

    return res.status(201).json(newUser); // Retornando o usuário criado
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
};

// Função de login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Dados recebidos no login:", req.body);  // Log para verificar os dados

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios!" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    console.log("Usuário encontrado:", user);  // Log do usuário encontrado

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Senha válida:", isPasswordValid);  // Log da comparação de senha

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha inválida!" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
};

