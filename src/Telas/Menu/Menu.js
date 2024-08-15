import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaCalendarAlt, FaClock, FaSignOutAlt, FaRegClock, FaUserEdit, FaUserTimes } from 'react-icons/fa';
import styles from './Menu.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiService from '../../Services/apiService';

const Menu = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleUpdateData = () => {
        navigate('/usuario/editar');
    };

    const handleDesativarteUser = async () => {
        try {
            await apiService.DeletarAsync(user.id);
            localStorage.removeItem('user');
            navigate('/');
        } catch (error) {
            console.error('Erro ao desativar o usuário:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Menu portal do funcionário</h1>

                {user && (
                    <div className={styles.userInfoContainer}>
                        <h2 className={styles.userInfoTitle}>Dados do Usuário</h2>
                        <div className={styles.userInfo}>
                            <p><strong>Nome:</strong> {user.nome} {user.sobrenome}</p>
                            <p><strong>Telefone:</strong> {user.telefone}</p>
                            <p><strong>Endereço:</strong> {user.endereco}</p>
                        </div>
                    </div>
                )}

                <div className={styles.mainContent}>
                    <div className={styles.leftColumn}>
                        <ul className="list-unstyled">
                            <li className={`mb-3 ${styles.navItem}`}>
                                <Link to="/usuario/holerites" className={styles.link}>
                                    <FaFileAlt className={styles.icon} /> Holerites
                                </Link>
                            </li>
                            <li className={`mb-3 ${styles.navItem}`}>
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
                        </ul>
                    </div>

                    <div className={styles.rightColumn}>
                        <ul className="list-unstyled">
                            <li className={`mb-3 ${styles.navItem}`}>
                                <button onClick={handleUpdateData} className={styles.linkButton}>
                                    <FaUserEdit className={styles.icon} /> Atualizar dados
                                </button>
                            </li>
                            <li className={`mb-3 ${styles.navItem}`}>
                                <button onClick={handleDesativarteUser} className={styles.linkButton}>
                                    <FaUserTimes className={styles.icon} /> Desativar usuário
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <button onClick={handleLogout} className={styles.linkSairButton}>
                        <FaSignOutAlt className={styles.icon} /> Sair
                    </button>
                </div>

                <p className={styles.rodape}>Desenvolvido por Leonardo W O Dias</p>
            </div>
        </div>
    );
};

export default Menu;
