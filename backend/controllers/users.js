import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Para gerar o token de autenticação

// Função para buscar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); 
    return res.json(users); 
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

// Função para rota de atualização de usuário
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Se a senha foi fornecida, criptografa e atualiza
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({ name, email, password: hashedPassword });
    } else {
      // Caso contrário, apenas atualiza o nome e o email
      await user.update({ name, email });
    }

    return res.json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};


// Função para rota soft delete de usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy(); // O Sequelize vai marcar o `deletedAt` automaticamente

    return res.json({ message: "Usuário removido com sucesso (soft delete)" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover usuário" });
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
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