import { useState, ChangeEvent } from 'react';
import './Tabela.css';

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    quantidade: number;
};

const MaiorQntd = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);

    const clientes: Cliente[] = [
        { id: 12, nome: 'Eduardo Melo', nomeSocial: 'E. Melo', genero: 'Masculino', cpf: '36925814700', quantidade: 1 },
        { id: 11, nome: 'Camila Rocha', nomeSocial: 'Camila R.', genero: 'Feminino', cpf: '14725836900', quantidade: 1 },
        { id: 19, nome: 'Aline Ferreira', nomeSocial: 'Aline F.', genero: 'Feminino', cpf: '74196385200', quantidade: 1 },
        { id: 18, nome: 'Gustavo Vieira', nomeSocial: 'Gustavo V.', genero: 'Masculino', cpf: '98732165400', quantidade: 2 },
        { id: 13, nome: 'Larissa Pinto', nomeSocial: 'Larissa P.', genero: 'Feminino', cpf: '25814736900', quantidade: 2 },
        { id: 16, nome: 'Rafael Teixeira', nomeSocial: 'Rafael T.', genero: 'Masculino', cpf: '65412378900', quantidade: 3 },
        { id: 14, nome: 'Thiago Nunes', nomeSocial: 'Thiago N.', genero: 'Masculino', cpf: '12378945600', quantidade: 3 },
        { id: 15, nome: 'Beatriz Cunha', nomeSocial: 'B. Cunha', genero: 'Feminino', cpf: '32198765400', quantidade: 3 },
        { id: 17, nome: 'Juliana Barbosa', nomeSocial: 'Juliana B.', genero: 'Feminino', cpf: '45632198700', quantidade: 4 },
        { id: 20, nome: 'Felipe Castro', nomeSocial: 'F. Castro', genero: 'Masculino', cpf: '96385274100', quantidade: 5 }
    ];

    const clientesPorPagina = 10;

    const handleBusca = (event: ChangeEvent<HTMLInputElement>) => {
        setBusca(event.target.value);
        setPaginaAtual(1);
    };

    const mudarPagina = (pagina: number) => {
        setPaginaAtual(pagina);
    };

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
    const inicio = (paginaAtual - 1) * clientesPorPagina;
    const fim = inicio + clientesPorPagina;
    const clientesPagina = clientesFiltrados.slice(inicio, fim);

    return (
        <>
            <div className="tabela">
                <h2>Top 10 consumidores (em quantidade)</h2>

                {/* Barra de pesquisa */}
                <input
                    type="text"
                    placeholder="Nome do cliente"
                    value={busca}
                    onChange={handleBusca}
                    className="input-busca"
                />

                {/* Tabela */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Nome Social</th>
                            <th>Gênero</th>
                            <th>CPF</th>
                            <th>Compras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesPagina.length > 0 ? (
                            clientesPagina.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.nomeSocial}</td>
                                    <td>{cliente.genero}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.quantidade}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>Nenhum cliente encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            {totalPaginas > 1 && (
                <div className="paginacao">
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pagina => (
                        <button
                            key={pagina}
                            onClick={() => mudarPagina(pagina)}
                            className={pagina === paginaAtual ? 'ativo' : ''}
                        >
                            {pagina}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default MaiorQntd;
