import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaUserEdit, FaCalendarAlt, FaClock, FaSignOutAlt } from 'react-icons/fa'; // Importa ícones do react-icons
import styles from './Menu.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Bem-vindo ao Menu</h1>
                <nav className={styles.nav}>
                    <ul className="list-unstyled">
                        <li className="mb-3">
                            <Link to="/holerites" className={styles.link}>
                                <FaFileAlt className={styles.icon} /> Holerites
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/atualizarDados" className={styles.link}>
                                <FaUserEdit className={styles.icon} /> Atualizar dados
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/agendarFerias" className={styles.link}>
                                <FaCalendarAlt className={styles.icon} /> Agendar férias
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/horasExtras" className={styles.link}>
                                <FaClock className={styles.icon} /> Horas extras
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/sair" className={styles.link}>
                                <FaSignOutAlt className={styles.icon} /> Sair
                            </Link>
                        </li>
                    </ul>
                </nav>
                <p className={styles.rodape}>Desenvolvido por Leonardo W O Dias</p>
            </div>

        </div>
    );
};

export default Menu;
