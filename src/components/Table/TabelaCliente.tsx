import React, { useState, ChangeEvent } from 'react';
import './Tabela.css';

type Cliente = {
  id: number;
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
};

const TabelaClientes: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const clientesPorPagina = 10;

  const clientes: Cliente[] = [
    { id: 1, nome: 'Maria Silva', nomeSocial: 'Maria S.', genero: 'Feminino', cpf: '12345678900'},
    { id: 2, nome: 'João Souza', nomeSocial: 'J. Souza', genero: 'Masculino', cpf: '98765432100'},
    { id: 3, nome: 'Ana Lima', nomeSocial: 'Ana L.', genero: 'Feminino', cpf: '45678912300'},
    { id: 4, nome: 'Carlos Ramos', nomeSocial: 'C. Ramos', genero: 'Masculino', cpf: '32165498700'},
    { id: 5, nome: 'Fernanda Lopes', nomeSocial: 'F. Lopes', genero: 'Feminino', cpf: '15975348600'},
    { id: 6, nome: 'Paulo Henrique', nomeSocial: 'PH', genero: 'Masculino', cpf: '78945612300'},
    { id: 7, nome: 'Marina Costa', nomeSocial: 'Marina C.', genero: 'Feminino', cpf: '74125896300'},
    { id: 8, nome: 'Roberto Dias', nomeSocial: 'Roberto D.', genero: 'Masculino', cpf: '85214796300'},
    { id: 9, nome: 'Bruna Alves', nomeSocial: 'Bruna A.', genero: 'Feminino', cpf: '95175345600'},
    { id: 10, nome: 'Ricardo Martins', nomeSocial: 'Ricardo M.', genero: 'Masculino', cpf: '75395145600'},
    { id: 11, nome: 'Camila Rocha', nomeSocial: 'Camila R.', genero: 'Feminino', cpf: '14725836900'},
    { id: 12, nome: 'Eduardo Melo', nomeSocial: 'E. Melo', genero: 'Masculino', cpf: '36925814700'},
    { id: 13, nome: 'Larissa Pinto', nomeSocial: 'Larissa P.', genero: 'Feminino', cpf: '25814736900'},
    { id: 14, nome: 'Thiago Nunes', nomeSocial: 'Thiago N.', genero: 'Masculino', cpf: '12378945600'},
    { id: 15, nome: 'Beatriz Cunha', nomeSocial: 'B. Cunha', genero: 'Feminino', cpf: '32198765400'},
    { id: 16, nome: 'Rafael Teixeira', nomeSocial: 'Rafael T.', genero: 'Masculino', cpf: '65412378900'},
    { id: 17, nome: 'Juliana Barbosa', nomeSocial: 'Juliana B.', genero: 'Feminino', cpf: '45632198700'},
    { id: 18, nome: 'Gustavo Vieira', nomeSocial: 'Gustavo V.', genero: 'Masculino', cpf: '98732165400'},
    { id: 19, nome: 'Aline Ferreira', nomeSocial: 'Aline F.', genero: 'Feminino', cpf: '74196385200'},
    { id: 20, nome: 'Felipe Castro', nomeSocial: 'F. Castro', genero: 'Masculino', cpf: '96385274100'}
  ];

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
        <h2>Lista de clientes registrados</h2>

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

      {/* Paginação */}
      <div>
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
      </div>
    </>
  );
};

export default TabelaClientes;
