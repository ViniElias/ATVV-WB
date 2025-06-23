import { useState, ChangeEvent, useEffect } from 'react';
import './Tabela.css';
import { Produto } from '../../models/Produto';

const TabelaGeral = () => {
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const produtosPorPagina = 10;

  useEffect(() => {
    fetch('http://localhost:3001/produtos/geral')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error('Erro ao carregar:', err));
  }, []);

  const handleBusca = (event: ChangeEvent<HTMLInputElement>) => {
    setBusca(event.target.value);
    setPaginaAtual(1);
  };

  const mudarPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
  const inicio = (paginaAtual - 1) * produtosPorPagina;
  const fim = inicio + produtosPorPagina;
  const produtosPagina = produtosFiltrados.slice(inicio, fim);

  return (
    <>
      <div className="tabela">
        <h2>Lista de produtos registrados</h2>
        <input
          type="text"
          placeholder="Nome"
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
              <th>Vendas</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {produtosPagina.length > 0 ? (
              produtosPagina.map(produto => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.vendas}</td>
                  <td>{produto.tipo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Nenhum produto/serviço encontrado.</td>
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

export default TabelaGeral;