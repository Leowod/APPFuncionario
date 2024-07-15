import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} mb-4 text-center`}>Portal do Funcionário</h1>
      <div className={styles.box}>
        <div className="d-flex flex-column align-items-center gap-2 w-100">
          <button className="btn btn-primary w-100 max-w-300" onClick={() => navigate('/Login')}>
            Entrar
          </button>
          <button className="btn btn-secondary w-100 max-w-300" onClick={() => navigate('/Cadastrar')}>
            Cadastrar
          </button>
        </div>
      </div>
      <h2 className={`${styles.rodape} mb-4 text-center`}>Desenvolvido por Leonardo Dias</h2>
    </div>
  );
};

export default Home;
