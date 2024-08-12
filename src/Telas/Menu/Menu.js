import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaUser, FaCalendarAlt, FaClock, FaSignOutAlt, FaRegClock } from 'react-icons/fa';
import styles from './Menu.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Recuperar informações do usuário do localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Bem-vindo ao Menu</h1>
                
                {/* Exibir informações do usuário */}
                {user && (
                    <div className={styles.userInfo}>
                        <p><strong>Nome:</strong> {user.nome} {user.sobrenome}</p>
                        <p><strong>Telefone:</strong> {user.telefone}</p>
                        <p><strong>Endereço:</strong> {user.endereco}</p>
                    </div>
                )}

                <nav className={styles.nav}>
                    <ul className="list-unstyled">
                        <li className="mb-3">
                            <Link to="/perfil" className={styles.link}>
                                <FaUser className={styles.icon} /> Acessar perfil
                            </Link>
                        </li>

                        <li className="mb-3">
                            <Link to="usuario/holerites" className={styles.link}>
                                <FaFileAlt className={styles.icon} /> Holerites
                            </Link>
                        </li>

                        <li className="mb-3">
                            <Link to="/usuario/agendarFerias" className={styles.link}>
                                <FaCalendarAlt className={styles.icon} /> Agendar férias
                            </Link>
                        </li>

                        <li className="mb-3">
                            <Link to="/usuario/horasExtras" className={styles.link}>
                                <FaClock className={styles.icon} /> Horas extras
                            </Link>
                        </li>

                        <li className="mb-5">
                            <Link to="/usuario/bancohoras" className={styles.link}>
                                <FaRegClock className={styles.icon} /> Banco de horas
                            </Link>
                        </li>

                        <li className="mb-0">
                            <Link to="/usuario/sair" className={styles.link}>
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
