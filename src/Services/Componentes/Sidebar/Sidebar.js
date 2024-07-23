import style from './Sidebar.module.css';

export function Sidebar() {
    return (
        <div>
            <div className={style.sidebar_conteudo}>
                <h2>Menu</h2>
                <ul>
                    <li><a href="#">Holerites</a></li>
                    <li><a href="#">Atualizar Dados</a></li>
                    <li><a href="#">Agendar férias</a></li>
                    <li><a href="#">Horas extras </a></li>
                    <li><a href="#">Sair</a></li>
                </ul>
            </div>
        </div>        
    )
}