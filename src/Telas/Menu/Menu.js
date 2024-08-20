import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaCalendarAlt, FaClock, FaSignOutAlt, FaRegClock, FaUserEdit, FaUserTimes, FaKey } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import styles from './Menu.module.css';
import apiService from '../../Services/apiService';

const Menu = () => {
    const [user, setUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({
        nome: '',
        sobrenome: '',
        telefone: '',
        endereco: ''
    });
    const [passwordData, setPasswordData] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarNovaSenha: ''
    });
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
        setUpdatedUserData({
            nome: user.nome || '',
            sobrenome: user.sobrenome || '',
            telefone: user.telefone || '',
            endereco: user.endereco || ''
        });
        setShowUpdateModal(true);
    };

    const handleSaveUpdatedData = async () => {
        try {
            const updatedUser = await apiService.atualizarUsuarioLogado(updatedUserData);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setShowUpdateModal(false);
            navigate('/usuario/menu');
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário:', error);
        }
    };

    const handleChangePassword = () => {
        setShowChangePasswordModal(true);
    };

    const handleSaveNewPassword = async () => {
        if (passwordData.novaSenha !== passwordData.confirmarNovaSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            await apiService.alterarSenha({
                senhaAtual: passwordData.senhaAtual,
                novaSenha: passwordData.novaSenha
            });

            setPasswordData({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
            setShowChangePasswordModal(false);
            navigate('/usuario/menu');
        } catch (error) {
            console.error('Erro ao alterar a senha:', error);
        }
    };

    const handleDesativarteUser = async () => {
        try {
            await apiService.deletarUsuarioLogado();
            localStorage.removeItem('user');
            navigate('/');
        } catch (error) {
            console.error('Erro ao desativar o usuário:', error);
        }
    };

    const handleConfirmDesativar = () => {
        setShowConfirmModal(true);
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    const handleConfirmDesativarUser = async () => {
        await handleDesativarteUser();
        setShowConfirmModal(false);
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
                                <Link to="/usuario/agendarFerias" className={styles.link}>
                                    <FaCalendarAlt className={styles.icon} /> Agendar férias
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/usuario/bancohoras" className={styles.link}>
                                    <FaRegClock className={styles.icon} /> Banco de horas
                                </Link>
                            </li>
                            <li className={`mb-3 ${styles.navItem}`}>
                                <Link to="/usuario/holerites" className={styles.link}>
                                    <FaFileAlt className={styles.icon} /> Holerites
                                </Link>
                            </li>
                            <li className="mb-5">
                                <Link to="/usuario/horasExtras" className={styles.link}>
                                    <FaClock className={styles.icon} /> Horas extras
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
                                <button onClick={handleChangePassword} className={styles.linkButton}>
                                    <FaKey className={styles.icon} /> Alterar senha
                                </button>
                            </li>
                            <li className={`mb-3 ${styles.navItem}`}>
                                <button onClick={handleConfirmDesativar} className={styles.linkButton}>
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

            <Modal show={showConfirmModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Desativação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza de que deseja desativar seu usuário?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDesativarUser}>
                        Desativar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Dados do Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                value={updatedUserData.nome}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, nome: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sobrenome"
                                value={updatedUserData.sobrenome}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, sobrenome: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="telefone"
                                value={updatedUserData.telefone}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, telefone: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endereco" className="form-label">Endereço</label>
                            <input
                                type="text"
                                className="form-control"
                                id="endereco"
                                value={updatedUserData.endereco}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, endereco: e.target.value })}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveUpdatedData}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showChangePasswordModal} onHide={() => setShowChangePasswordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Alterar Senha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="senhaAtual" className="form-label">Senha Atual</label>
                            <input
                                type="password"
                                className="form-control"
                                id="senhaAtual"
                                value={passwordData.senhaAtual}
                                onChange={(e) => setPasswordData({ ...passwordData, senhaAtual: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="novaSenha"
                                value={passwordData.novaSenha}
                                onChange={(e) => setPasswordData({ ...passwordData, novaSenha: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmarNovaSenha" className="form-label">Confirmar Nova Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmarNovaSenha"
                                value={passwordData.confirmarNovaSenha}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmarNovaSenha: e.target.value })}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowChangePasswordModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveNewPassword}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Menu;
