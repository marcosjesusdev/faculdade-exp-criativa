import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Para gerar o token de autenticação

// GET /users?page=&limit=
export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await User.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    const totalPages = Math.ceil(count / limit);
    return res.json({ users: rows, totalItems: count, totalPages, currentPage: page });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

// POST /users
export const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    cpf,
    genero,
    dataNascimento,
    endereco
  } = req.body;

  // Validação de campos obrigatórios
  if (!name || !email || !password || !confirmPassword || !cpf || !genero || !dataNascimento || !endereco) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem!" });
  }

  try {
    // Verificar duplicidade de e-mail
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "E-mail já registrado!" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário com todos os campos
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      genero,
      dataNascimento,
      endereco
    });

    // Retorna os dados sem a senha
    const { password: _, ...userData } = newUser.toJSON();
    return res.status(201).json(userData);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    cpf,
    genero,
    dataNascimento,
    endereco
  } = req.body;

  // Nome, email, cpf, genero, dataNascimento e endereco são obrigatórios
  if (!name || !email || !cpf || !genero || !dataNascimento || !endereco) {
    return res.status(400).json({ message: "Todos os campos (exceto senha) são obrigatórios!" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Monta objeto de atualizações
    const updates = { name, email, cpf, genero, dataNascimento, endereco };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    await user.update(updates);
    return res.json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

// DELETE /users/:id  (soft delete)
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    await user.destroy();
    return res.json({ message: "Usuário removido com sucesso (soft delete)" });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    return res.status(500).json({ message: "Erro ao remover usuário" });
  }
};

// POST /login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios!" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Senha inválida!" });

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
