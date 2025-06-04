import React, { Component, ChangeEvent } from 'react';
import './Tabela.css';

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    quantidade: number;
};

type State = {
    clientes: Cliente[];
    busca: string;
    paginaAtual: number;
};

export default class MaiorQntd extends Component<{}, State> {
    state: State = {
        busca: '',
        paginaAtual: 1,
        clientes: [
            { id: 1, nome: 'Maria Silva', nomeSocial: 'Maria S.', genero: 'Feminino', cpf: '12345678900', quantidade: 18 },
            { id: 2, nome: 'João Souza', nomeSocial: 'J. Souza', genero: 'Masculino', cpf: '98765432100', quantidade: 16 },
            { id: 3, nome: 'Ana Lima', nomeSocial: 'Ana L.', genero: 'Feminino', cpf: '45678912300', quantidade: 15 },
            { id: 4, nome: 'Carlos Ramos', nomeSocial: 'C. Ramos', genero: 'Masculino', cpf: '32165498700', quantidade: 14 },
            { id: 5, nome: 'Fernanda Lopes', nomeSocial: 'F. Lopes', genero: 'Feminino', cpf: '15975348600', quantidade: 13 },
            { id: 6, nome: 'Paulo Henrique', nomeSocial: 'PH', genero: 'Masculino', cpf: '78945612300', quantidade: 12 },
            { id: 7, nome: 'Marina Costa', nomeSocial: 'Marina C.', genero: 'Feminino', cpf: '74125896300', quantidade: 11 },
            { id: 8, nome: 'Roberto Dias', nomeSocial: 'Roberto D.', genero: 'Masculino', cpf: '85214796300', quantidade: 10 },
            { id: 9, nome: 'Bruna Alves', nomeSocial: 'Bruna A.', genero: 'Feminino', cpf: '95175345600', quantidade: 9 },
            { id: 10, nome: 'Ricardo Martins', nomeSocial: 'Ricardo M.', genero: 'Masculino', cpf: '75395145600', quantidade: 8 }
        ]
    };

    clientesPorPagina = 10;

    handleBusca = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ busca: event.target.value, paginaAtual: 1 });
    };

    mudarPagina = (pagina: number) => {
        this.setState({ paginaAtual: pagina });
    };

    render() {
        const { clientes, busca, paginaAtual } = this.state;

        const clientesFiltrados = clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(busca.toLowerCase())
        );

        const totalPaginas = Math.ceil(clientesFiltrados.length / this.clientesPorPagina);
        const inicio = (paginaAtual - 1) * this.clientesPorPagina;
        const fim = inicio + this.clientesPorPagina;
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
                        onChange={this.handleBusca}
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
                                    <td colSpan={5}>Nenhum cliente encontrado.</td>
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