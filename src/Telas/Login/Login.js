import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';
import { login } from '../../Services/apiService';
import './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!cpf || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await login(cpf, senha);
      
      if (response || response.user) {
        localStorage.setItem('token', response.user);
        navigate('/usuario/menu');
      } else {
        setError('Erro ao obter token de autenticação.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('CPF ou senha incorretos.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Preencha os campos abaixo para acessar o Menu</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cpf">CPF</label>
            <InputMask
              mask="999.999.999-99"
              maskChar={null}
              className={`form-control ${styles.input}`}
              id="cpf"
              placeholder="___.___.___-__"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="senha">Senha</label>
            <input
              type="password"
              className={`form-control ${styles.input}`}
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Entrar
          </button>
          <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/')}>
            Voltar
          </button>
        </form>
        <p className={styles.rodape}>Desenvolvido por Leonardo W O Dias</p>
      </div>
    </div>
  );
};

export default Login;
