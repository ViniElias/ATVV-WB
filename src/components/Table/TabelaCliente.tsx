import React, { Component, ChangeEvent } from 'react';
import './TabelaCliente.css';

type Cliente = {
  id: number;
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
};

type State = {
  clientes: Cliente[];
  busca: string;
  paginaAtual: number;
};

export default class TabelaClientes extends Component<{}, State> {
  state: State = {
    busca: '',
    paginaAtual: 1,
    clientes: [
      { id: 1, nome: 'Maria Silva', nomeSocial: 'Maria S.', genero: 'Feminino', cpf: '12345678900' },
      { id: 2, nome: 'João Souza', nomeSocial: 'J. Souza', genero: 'Masculino', cpf: '98765432100' },
      { id: 3, nome: 'Ana Lima', nomeSocial: 'Ana L.', genero: 'Feminino', cpf: '45678912300' },
      { id: 4, nome: 'Carlos Ramos', nomeSocial: 'C. Ramos', genero: 'Masculino', cpf: '32165498700' },
      { id: 5, nome: 'Fernanda Lopes', nomeSocial: 'F. Lopes', genero: 'Feminino', cpf: '15975348600' },
      { id: 6, nome: 'Maria Silva', nomeSocial: 'Maria S.', genero: 'Feminino', cpf: '12345678900' },
      { id: 7, nome: 'João Souza', nomeSocial: 'J. Souza', genero: 'Masculino', cpf: '98765432100' },
      { id: 8, nome: 'Ana Lima', nomeSocial: 'Ana L.', genero: 'Feminino', cpf: '45678912300' },
      { id: 9, nome: 'Carlos Ramos', nomeSocial: 'C. Ramos', genero: 'Masculino', cpf: '32165498700' },
      { id: 10, nome: 'Fernanda Lopes', nomeSocial: 'F. Lopes', genero: 'Feminino', cpf: '15975348600' },
      { id: 11, nome: 'Maria Silva', nomeSocial: 'Maria S.', genero: 'Feminino', cpf: '12345678900' },
      { id: 12, nome: 'João Souza', nomeSocial: 'J. Souza', genero: 'Masculino', cpf: '98765432100' },
      { id: 13, nome: 'Ana Lima', nomeSocial: 'Ana L.', genero: 'Feminino', cpf: '45678912300' },
      { id: 14, nome: 'Carlos Ramos', nomeSocial: 'C. Ramos', genero: 'Masculino', cpf: '32165498700' },
      { id: 15, nome: 'Fernanda Lopes', nomeSocial: 'F. Lopes', genero: 'Feminino', cpf: '15975348600' },
      { id: 16, nome: 'Paulo Henrique', nomeSocial: 'PH', genero: 'Masculino', cpf: '78945612300' }
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
        <div className="tabela-clientes">
          <h2>Lista de clientes registrados</h2>
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
