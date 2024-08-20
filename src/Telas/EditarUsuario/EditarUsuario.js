import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../Services/apiService';
import styles from './EditarUsuario.module.css';

const EditarUsuario = () => {
    const [user, setUser] = useState({
        id: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        endereco: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Obtém os dados do usuário do localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await apiService.atualizarAsync(user.id, user);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            navigate('/usuario/menu'); // Redireciona para o menu
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário:', error);
            // Adicione uma mensagem de erro se necessário
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Atualizar Dados</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={user.nome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Sobrenome:</label>
                        <input
                            type="text"
                            name="sobrenome"
                            value={user.sobrenome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Telefone:</label>
                        <input
                            type="text"
                            name="telefone"
                            value={user.telefone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Endereço:</label>
                        <input
                            type="text"
                            name="endereco"
                            value={user.endereco}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Atualizar</button>
                </form>
            </div>
        </div>
    );
};

export default EditarUsuario;