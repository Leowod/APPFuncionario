import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cadastrar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';
import { FaWhatsapp } from 'react-icons/fa';
import { cadastrar } from '../../Services/apiService';

const Cadastrar = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleCadastrar = async (e) => {
        e.preventDefault();
        
        if (senha !== confirmarSenha) {
            setError('Confirme a senha corretamente');
            return;
        }
       
        setError(null);

        try {
            
            await CadastrarUser();
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000); // 3 segundos para mostrar a mensagem de sucesso
        } catch (error) {
            setError(error.message || 'Erro ao cadastrar usuário');
        }
    };

    const CadastrarUser = async () => {
        try {
            const resposta = await cadastrar(nome, sobrenome, cpf, telefone, endereco, senha);
            console.log("Usuário cadastrado com sucesso:", resposta);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao cadastrar usuário');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1 className={styles.title}>Preencha os campos abaixo para se cadastrar</h1>
                <form onSubmit={handleCadastrar}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="nome">Nome:</label>
                        <input 
                            type="text" 
                            className={`form-control ${styles.input}`} 
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="sobrenome">Sobrenome:</label>
                        <input 
                            type="text" 
                            className={`form-control ${styles.input}`} 
                            id="sobrenome"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)} 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="cpf">CPF:</label>
                        <InputMask
                            mask="999.999.999-99"
                            maskChar={null}
                            className={`form-control ${styles.input}`}
                            id="cpf"
                            placeholder="___.___.___-__"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="telefone">
                            Telefone <FaWhatsapp className={styles.icon} /> :
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar={null}
                            className={`form-control ${styles.input}`}
                            id="telefone"
                            placeholder="(__) _____-____"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="endereco">Endereço:</label>
                        <input
                            type="text"
                            className={`form-control ${styles.input}`}
                            id="endereco"
                            placeholder="Rua, número, Bairro"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <small className="form-text text-muted">
                            Exemplo: Bom Funcionário, 123, Centro
                        </small>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="senha">Senha:</label>
                        <input 
                            type="password" 
                            className={`form-control ${styles.input}`} 
                            id="senha" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="confirmarSenha">Confirme a senha:</label>
                        <input 
                            type="password" 
                            className={`form-control ${styles.input}`} 
                            id="confirmarSenha" 
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">Cadastro realizado com sucesso! Redirecionando para o login...</p>}
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Cadastrar
                    </button>
                    <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/')}>
                        Voltar
                    </button>
                </form>
                <p className={styles.rodape}>Desenvolvido por Leonardo W O Dias</p>
            </div>
        </div>
    );
};

export default Cadastrar;
