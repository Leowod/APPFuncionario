import React, { useState } from 'react';
import styles from './RestaurarUsuario.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';
import { restaurarUsuario } from '../../Services/apiService';

const RestaurarUsuario = () => {
    const [cpf, setCpf] = useState('');
    const [mostrarProsseguir, setMostrarProsseguir] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleCpfChange = (e) => {
        setCpf(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultado = await restaurarUsuario(cpf);
            console.log(resultado);

            if (resultado.mensagem === "Usuário restaurado com sucesso.") {
                setMostrarProsseguir(true);
                setMensagem('Usuário restaurado com sucesso.');
            } else if (resultado.mensagem === "Usuário já está ativo.") {
                setMostrarProsseguir(false);
                setMensagem('Usuário já está ativo.');
            } else if (resultado.mensagem === "Usuário não encontrado.") {
                setMostrarProsseguir(false);
                setMensagem('CPF não encontrado. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao verificar CPF:', error);
            setMensagem('Erro! O CPF pode já estar ativo ou ser um CPF inválido.');
        }
    };

    const handleProsseguir = () => {
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1 className={styles.title}>Restaurar perfil de usuário inativo</h1>
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-2 w-100">
                    <div className="form-group w-100">
                        <InputMask
                            mask="999.999.999-99"
                            maskChar={null}
                            className={`form-control ${styles.input}`}
                            placeholder="___.___.___-__"
                            value={cpf}
                            onChange={handleCpfChange}
                        />
                        <p className={styles.infoText}>Informe o CPF</p>
                    </div>

                    <button 
                        type="submit" 
                        className={`btn ${styles['btn-restaurar']} w-100 max-w-300`}
                        disabled={mostrarProsseguir}
                    >
                        Restaurar
                    </button>
                </form>

                {mostrarProsseguir && (
                    <button 
                        onClick={handleProsseguir} 
                        className={`btn ${styles['btn-restaurar']} w-100 max-w-300 mt-3`}
                    >
                        Prosseguir para Tela de Login
                    </button>
                )}

                {mensagem && <p className="text-center mt-3">{mensagem}</p>}
                <p className={styles.rodape}>Desenvolvido por Leonardo W O Dias</p>
            </div>
        </div>
    );
};

export default RestaurarUsuario;
