import { useState, ChangeEvent, useEffect } from 'react';
import './Tabela.css';
import { Produto } from '../../models/Produto';

const TabelaProdutos = () => {
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const produtosPorPagina = 10;

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error('Erro ao carregar produtos:', err));
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
          placeholder="Nome do produto"
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Nenhum produto encontrado.</td>
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

export default TabelaProdutos;