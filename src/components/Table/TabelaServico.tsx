import React, { useState, ChangeEvent } from 'react';
import './Tabela.css';

type Produto = {
    id: number;
    nome: string;
    preco: string;
};

const TabelaServicos: React.FC = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const servicosPorPagina = 10;

    const [servicos] = useState<Produto[]>([
        { id: 1, nome: 'Corte de cabelo', preco: '30,00' },
        { id: 2, nome: 'Barba completa', preco: '25,00' },
        { id: 3, nome: 'Sobrancelha com pinça', preco: '15,00' },
        { id: 4, nome: 'Hidratação capilar', preco: '40,00' },
        { id: 5, nome: 'Progressiva', preco: '120,00' },
        { id: 6, nome: 'Coloração capilar', preco: '80,00' },
        { id: 7, nome: 'Luzes ou mechas', preco: '150,00' },
        { id: 8, nome: 'Penteado para festa', preco: '70,00' },
        { id: 9, nome: 'Escova modeladora', preco: '35,00' },
        { id: 10, nome: 'Selagem térmica', preco: '110,00' },
        { id: 11, nome: 'Design de barba', preco: '28,00' },
        { id: 12, nome: 'Corte infantil', preco: '20,00' },
        { id: 13, nome: 'Platinado masculino', preco: '90,00' },
        { id: 14, nome: 'Limpeza de pele', preco: '50,00' },
        { id: 15, nome: 'Massagem capilar', preco: '32,00' }
    ]);

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
                            <th>Preço</th>
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