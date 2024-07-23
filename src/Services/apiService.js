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
    const response = await api.post('/logar', { cpf, senha });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastrar = async (nome, cpf, senha, telefone, sobrenome) => {
  try {
    const usuario = {
      nome: nome,
      cpf: cpf,
      senha: senha,
      telefone: telefone,
      sobrenome: sobrenome,
    }

    console.log(usuario);

    const response = await api.post('/Usuario/Cadastrar', usuario);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Adicione outras funções conforme as necessidades da sua aplicação
