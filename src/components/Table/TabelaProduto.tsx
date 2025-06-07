import { useState, ChangeEvent } from 'react';
import './Tabela.css';

type Produto = {
  id: number;
  nome: string;
  preco: string;
};

const TabelaProdutos = () => {
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const produtosPorPagina = 10;

  const [produtos] = useState<Produto[]>([
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
    { id: 20, nome: 'Kit Completo Hidratação', preco: '85,00' },
  ]);

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
