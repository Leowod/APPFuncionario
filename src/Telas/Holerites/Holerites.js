import React from 'react';
import { Table } from 'react-bootstrap';
import styles from './Holerites.module.css';
import { useNavigate } from 'react-router-dom';

const Holerites = () => {
    const navigate = useNavigate();
    // Aqui coloquei os endereçõs ficticios para demonstração
    const holerites = [
        { mes: 'Janeiro', link: '/downloads/holerite-janeiro.pdf' },
        { mes: 'Fevereiro', link: '/downloads/holerite-fevereiro.pdf' },
        { mes: 'Março', link: '/downloads/holerite-marco.pdf' },
        { mes: 'Abril', link: '/downloads/holerite-abril.pdf' },
        { mes: 'Maio', link: '/downloads/holerite-maio.pdf' },
        { mes: 'Junho', link: '/downloads/holerite-junho.pdf' },
        { mes: 'Julho', link: '/downloads/holerite-julho.pdf' },
        { mes: 'Agosto', link: '/downloads/holerite-agosto.pdf' },
        { mes: 'Setembro', link: '/downloads/holerite-setembro.pdf' },
        { mes: 'Outubro', link: '/downloads/holerite-outubro.pdf' },
        { mes: 'Novembro', link: '/downloads/holerite-novembro.pdf' },
        { mes: 'Dezembro', link: '/downloads/holerite-dezembro.pdf' },

    ];

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1 className={`${styles.title} text-center`}>Seus holerites</h1>
                <Table bordered hover >
                    <thead>
                        <tr>
                            <th>Mês</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holerites.map((holerite, index) => (
                            <tr key={index}>
                                <td>{holerite.mes}</td>
                                <td>
                                    <a href={holerite.link} download>
                                        Baixar Holerite
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/usuario/menu')}>
                    Voltar
                </button>
                <p className={styles.rodape}>Desenvolvido por Leonardo W O Dias</p>
            </div>
        </div>
    );
};

export default Holerites;
