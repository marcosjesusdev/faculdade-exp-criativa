// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8800', // URL do seu backend
});

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// Função para login
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData); // Rota para login no backend
    return response.data; // Retorna os dados do usuário logado
  } catch (error) {
    throw new Error("Erro ao realizar o login");
  }
};

// frontend/src/services/api.js
export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return response.data;
};
