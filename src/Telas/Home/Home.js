import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={`${styles.title} text-center`}>Portal do Funcionário</h1>
        <h2 className={`${styles.slogan} text-center`}>A conexão rápida com sua empresa</h2>

        <div className="d-flex flex-column align-items-center gap-2 w-100">
          <button className="btn btn-primary w-100 max-w-300" onClick={() => navigate('/Login')}>
            Acessar
          </button>
          <button className="btn btn-secondary w-100 max-w-300" onClick={() => navigate('/usuario/cadastro')}>
            Cadastrar
          </button>
          <p className={`${styles.rodape} text-center`}>Desenvolvido por Leonardo W O Dias</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
