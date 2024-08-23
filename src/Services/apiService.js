import axios from 'axios';

const API_URL = 'https://localhost:7215';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const atualizar = async (id,dados) =>
{

    const info = {
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      telefone: dados.telefone,
      endereco: dados.endereco
    }

    const response = await api.put(`/usuario/atualizar/${id}`, info )

    return response.data;
} 


export const alterarSenha = async (dados) => { 
  

    const info = {
      id: dados.id,
      senha: dados.senha,
      novaSenha: dados.novaSenha
    }

    return await api.put(`/usuario/alterarSenha`, info)

}

export const login = async (cpf, senha) => {
  try {
    const response = await api.post('/usuario/Logar', { cpf, senha });
    return response.data;
  } catch (error) {
    return error;
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

export const atualizarUsuario = async (dadosAtualizados) => {
  console.log("ADFDSDFSDFGDFDG" , dadosAtualizados || "SDASADSADSDFSD");
  try {
    console.log("sfdfgdghfghghjgh");
    const response = await api.put(`/usuario/Atualizar/${dadosAtualizados.usuarioId}`, dadosAtualizados);

    console.log("Resposta da API:", response.data);

    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar os dados do usuário:DE', error);
    throw error;
  }
};

export const deletarUsuarioLogadoAsync = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await api.delete('/usuario/Delete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Resposta da API ao deletar usuário:", response.data);

    return response.data;
  } catch (error) {
    console.error('Erro ao desativar o usuário:', error);
    throw new Error('Erro ao desativar o usuário');
  }
};


export default api;
