import React, { Component, ChangeEvent } from 'react';
import './Tabela.css';

type Produto = {
    id: number;
    nome: string;
    preco: string;
};

type State = {
    produtos: Produto[];
    busca: string;
    paginaAtual: number;
};

export default class TabelaProdutos extends Component<{}, State> {
    state: State = {
        busca: '',
        paginaAtual: 1,
        produtos: [
            { id: 1, nome: 'Shampoo Anticaspa', preco: '30,00' },
            { id: 2, nome: 'Condicionador Nutritivo', preco: '25,00' },
            { id: 3, nome: 'Creme para Pentear', preco: '22,50' },
            { id: 4, nome: 'Máscara Hidratante', preco: '35,90' },
            { id: 5, nome: 'Gel Fixador Forte', preco: '18,00' },
            { id: 6, nome: 'Pomada Modeladora', preco: '27,00' },
            { id: 7, nome: 'Óleo Capilar', preco: '32,99' },
            { id: 8, nome: 'Leave-in Reconstrutor', preco: '29,50' },
            { id: 9, nome: 'Tônico Capilar', preco: '40,00' },
            { id: 10, nome: 'Spray de Brilho', preco: '24,90' },
            { id: 11, nome: 'Shampoo Neutro', preco: '19,99' },
            { id: 12, nome: 'Condicionador Suave', preco: '21,00' },
            { id: 13, nome: 'Ampola de Tratamento', preco: '15,00' },
            { id: 14, nome: 'Mousse Volumizador', preco: '26,90' },
            { id: 15, nome: 'Shampoo Matizador', preco: '33,00' },
            { id: 16, nome: 'Máscara Matizadora', preco: '38,50' },
            { id: 17, nome: 'Spray Texturizador', preco: '23,75' },
            { id: 18, nome: 'Balm Capilar', preco: '28,40' },
            { id: 19, nome: 'Sérum Reparador', preco: '36,80' },
            { id: 20, nome: 'Kit Completo Hidratação', preco: '85,00' }
        ]

    };

    produtosPorPagina = 10;

    handleBusca = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ busca: event.target.value, paginaAtual: 1 });
    };

    mudarPagina = (pagina: number) => {
        this.setState({ paginaAtual: pagina });
    };

    render() {
        const { produtos, busca, paginaAtual } = this.state;

        const produtosFiltrados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(busca.toLowerCase())
        );

        const totalPaginas = Math.ceil(produtosFiltrados.length / this.produtosPorPagina);
        const inicio = (paginaAtual - 1) * this.produtosPorPagina;
        const fim = inicio + this.produtosPorPagina;
        const produtosPagina = produtosFiltrados.slice(inicio, fim);

        return (
            <>
                <div className="tabela">
                    <h2>Lista de produtos registrados</h2>
                    {/* Barra de pesquisa */}
                    <input
                        type="text"
                        placeholder="Nome do produto"
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
                            {produtosPagina.length > 0 ? (
                                produtosPagina.map(produto => (
                                    <tr key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.preco}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>Nenhum produto encontrado.</td>
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
