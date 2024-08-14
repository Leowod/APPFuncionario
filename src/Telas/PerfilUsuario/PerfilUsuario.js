import React, { useState, useEffect } from 'react';
import styles from './PerfilUsuario.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { obterUsuarioPorCpf } from '../../Services/apiService';

const PerfilUsuario = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser && storedUser.cpf) {
                    const userData = await obterUsuarioPorCpf(storedUser.cpf);
                    console.log('Dados do usuário recebidos:', userData); // Log para depuração
                    setUser(userData); // Ajuste conforme a estrutura da resposta da API
                } else {
                    setError('Usuário não encontrado.');
                }
                setLoading(false);
            } catch (err) {
                console.error('Erro ao recuperar dados do usuário:', err);
                setError('Não foi possível carregar os dados do usuário.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleAtualizarDados = () => {
        window.location.href = '/usuario/editar';
    };

    const handleDesativarUsuario = () => {
        if (window.confirm('Tem certeza de que deseja desativar sua conta?')) {
            window.location.href = '/usuario/desativado';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Perfil do Usuário</h1>
                {loading ? (
                    <p>Carregando dados do usuário...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    user && (
                        <div className={styles.userInfo}>
                            <p><strong>Nome:</strong> {user.nome} {user.sobrenome}</p>
                            <p><strong>Telefone:</strong> {user.telefone}</p>
                            <p><strong>Endereço:</strong> {user.endereco}</p>

                            <div className={styles.buttonsContainer}>
                                <button 
                                    onClick={handleAtualizarDados} 
                                    className={`btn ${styles['btn-action']} ${styles['btn-atualizar']} mt-3`}
                                >
                                    Atualizar dados
                                </button>

                                <button 
                                    onClick={handleDesativarUsuario} 
                                    className={`btn ${styles['btn-action']} ${styles['btn-desativar']} mt-3`}
                                >
                                    Desativar usuário
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default PerfilUsuario;
