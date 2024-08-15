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

export const obterUsuarioPorCpf = async (cpf) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/obterPorCpf`, {
      params: { cpf: cpf }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
};

export const deletarUsuarioAsync = async (userId) => {
  try {
    const response = await axios.delete(`/api/usuarios/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao desativar o usuário');
  }
};

export const atualizarAsync = async (id, updatedUserData) => {
  try {
      const response = await axios.put(`/api/usuarios/${id}`, updatedUserData);
      return response.data;
  } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
      throw error;
  }
};

export default api;
