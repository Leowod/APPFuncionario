import React, { useState } from 'react';
import styles from './RestaurarUsuario.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';
import { restaurarUsuario } from '../../Services/apiService';

const RestaurarUsuario = () => {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleCpfChange = (e) => {
        setCpf(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultado = await restaurarUsuario(cpf);

            if (resultado.existe) {
                setMostrarSenha(true);
                setMensagem('Digite a senha para confirmar');
            } else {
                setMostrarSenha(false);
                setMensagem('CPF não encontrado. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao verificar CPF:', error);
            setMensagem('Erro ao verificar CPF. Tente novamente mais tarde.');
        }
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

                    {mostrarSenha && (
                        <div className="form-group w-100 mt-3">
                            <label className={styles.formLabel} htmlFor="senha">Digite a senha para confirmar</label>
                            <input
                                type="password"
                                className={`form-control ${styles.input}`}
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    )}

                    <button type="submit" className={`btn ${styles['btn-restaurar']} w-100 max-w-300`}>Restaurar</button>
                </form>
                {mensagem && <p className="text-center mt-3">{mensagem}</p>}
                <p className={styles.rodape}>Desenvolvido por Leonardo W O Dias</p>
            </div>
        </div>
    );
};

export default RestaurarUsuario;
