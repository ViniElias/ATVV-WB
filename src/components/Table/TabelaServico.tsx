import React, { useState, ChangeEvent, useEffect } from 'react';
import './Tabela.css';
import { Servico } from '../../models/Servico';

const TabelaServicos = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const servicosPorPagina = 10;

    useEffect(() => {
        fetch('http://localhost:3001/servicos')
          .then(res => res.json())
          .then(data => setServicos(data))
          .catch(err => console.error('Erro ao carregar serviços:', err));
      }, []);

    const handleBusca = (event: ChangeEvent<HTMLInputElement>) => {
        setBusca(event.target.value);
        setPaginaAtual(1);
    };

    const mudarPagina = (pagina: number) => {
        setPaginaAtual(pagina);
    };

    const servicosFiltrados = servicos.filter(servico =>
        servico.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const totalPaginas = Math.ceil(servicosFiltrados.length / servicosPorPagina);
    const inicio = (paginaAtual - 1) * servicosPorPagina;
    const fim = inicio + servicosPorPagina;
    const servicosPagina = servicosFiltrados.slice(inicio, fim);

    return (
        <>
            <div className="tabela">
                <h2>Lista de serviços registrados</h2>
                <input
                    type="text"
                    placeholder="Nome do serviço"
                    value={busca}
                    onChange={handleBusca}
                    className="input-busca"
                />

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicosPagina.length > 0 ? (
                            servicosPagina.map(servico => (
                                <tr key={servico.id}>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.preco}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>Nenhum serviço encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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

export default TabelaServicos;