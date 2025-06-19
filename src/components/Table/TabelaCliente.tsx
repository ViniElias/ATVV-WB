import React, { useState, ChangeEvent, useEffect } from 'react';
import { Cliente } from '../../models/Cliente';
import './Tabela.css';

const TabelaClientes: React.FC = () => {
  const clientesPorPagina = 10;
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Erro ao carregar clientes:', err));
  }, []);


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
