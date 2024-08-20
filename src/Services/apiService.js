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
    const response = await api.get(`/usuario/Restaurar/${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error;
  }
};

export const obterUsuarioPorCpf = async (cpf) => {
  try {
    const response = await api.get('/usuario/ObterPorCpf', {
      params: { cpf }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
};

export const deletarUsuarioAsync = async (userId) => {
  try {
    const response = await api.delete(`/usuario/Delete/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao desativar o usuário');
  }
};

export const deletarUsuarioLogado = async () => {
  try {
    const token = localStorage.getItem('token'); // Corrigido para buscar o token JWT
    const response = await api.delete('/usuario/Delete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao desativar o usuário');
  }
};

export const atualizarUsuarioLogado = async (dadosAtualizados) => {
  try {
      const token = localStorage.getItem('token');
      const response = await api.put('/usuario/Atualizar', dadosAtualizados, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      console.log("Resposta da API:", response);

      return response.data;
  } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
      throw error;
  }
};

export default api;
