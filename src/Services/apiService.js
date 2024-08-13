import axios from 'axios';

const API_URL = 'https://localhost:7215';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (cpf, senha) => {
  try {
    const response = await api.post('/usuario/Logar', { cpf, senha });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastrar = async (nome, sobrenome, cpf, telefone, endereco, senha) => {
  try {
    const response = await api.post('/usuario/Cadastrar', {
      nome,
      sobrenome,
      cpf,
      telefone,
      endereco,
      senha,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar usuário');
  }
};

export const restaurarUsuario = async (cpf) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/Restaurar/${cpf}`);
    console.log("Resposta completa:", response);
    return response.data;

  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error;
  }
};

export const confirmarRestauracao = async (cpf, senha) => {
  try {
    const response = await axios.post(`${API_URL}/usuario/restaurar/confirmar`, { cpf, senha });
    return response.data;
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error;
  }
};
