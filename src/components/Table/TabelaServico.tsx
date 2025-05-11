import React, { Component, ChangeEvent } from 'react';
import './Tabela.css';

type Servico = {
    id: number;
    nome: string;
    preco: string;
};

type State = {
    servicos: Servico[];
    busca: string;
    paginaAtual: number;
};

export default class TabelaServicos extends Component<{}, State> {
    state: State = {
        busca: '',
        paginaAtual: 1,
        servicos: [
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
        ]
    };

    servicosPorPagina = 10;

    handleBusca = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ busca: event.target.value, paginaAtual: 1 });
    };

    mudarPagina = (pagina: number) => {
        this.setState({ paginaAtual: pagina });
    };

    render() {
        const { servicos, busca, paginaAtual } = this.state;

        const servicosFiltrados = servicos.filter(servico =>
            servico.nome.toLowerCase().includes(busca.toLowerCase())
        );

        const totalPaginas = Math.ceil(servicosFiltrados.length / this.servicosPorPagina);
        const inicio = (paginaAtual - 1) * this.servicosPorPagina;
        const fim = inicio + this.servicosPorPagina;
        const servicosPagina = servicosFiltrados.slice(inicio, fim);

        return (
            <>
                <div className="tabela">
                    <h2>Lista de serviços registrados</h2>
                    {/* Barra de pesquisa */}
                    <input
                        type="text"
                        placeholder="Nome do serviço"
                        value={busca}
                        onChange={this.handleBusca}
                        className="input-busca"
                    />

                    {/* Tabela */}
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
                                    <td colSpan={5}>Nenhum serviço encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                <div>
                    {/* Paginação */}
                    {totalPaginas > 1 && (
                        <div className="paginacao">
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pagina => (
                                <button
                                    key={pagina}
                                    onClick={() => this.mudarPagina(pagina)}
                                    className={pagina === paginaAtual ? 'ativo' : ''}
                                >
                                    {pagina}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    }
}
