import { useState, ChangeEvent } from 'react';
import './Tabela.css';

type Produto = {
    id: number;
    nome: string;
    preco: string;
    tipo: string;
    quantidade: number;
    genero: string;
};

const ComprasH = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);

    const produtos: Produto[] = [
        { id: 1, nome: 'Corte de cabelo', tipo: 'Serviço', preco: '30,00', genero: 'Masculino', quantidade: 25 },
        { id: 2, nome: 'Barba completa', tipo: 'Serviço', preco: '25,00', genero: 'Masculino', quantidade: 23 },
        { id: 3, nome: 'Pomada Modeladora', tipo: 'Produto', preco: '27,00', genero: 'Masculino', quantidade: 22 },
        { id: 4, nome: 'Gel Fixador Forte', tipo: 'Produto', preco: '18,00', genero: 'Masculino', quantidade: 22 },
        { id: 5, nome: 'Shampoo Anticaspa', tipo: 'Produto', preco: '30,00', genero: 'Masculino', quantidade: 20 },
        { id: 6, nome: 'Tônico Capilar', tipo: 'Produto', preco: '40,00', genero: 'Masculino', quantidade: 18 },
        { id: 7, nome: 'Design de barba', tipo: 'Serviço', preco: '28,00', genero: 'Masculino', quantidade: 17 },
        { id: 8, nome: 'Sérum Reparador', tipo: 'Produto', preco: '36,80', genero: 'Masculino', quantidade: 15 },
        { id: 9, nome: 'Corte infantil', tipo: 'Serviço', preco: '20,00', genero: 'Masculino', quantidade: 14 },
        { id: 10, nome: 'Óleo Capilar', tipo: 'Produto', preco: '32,99', genero: 'Masculino', quantidade: 14 }
    ];

    const produtosPorPagina = 10;

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
                <h2>Produtos/serviços mais comprados (homens)</h2>

                {/* Barra de pesquisa */}
                <input
                    type="text"
                    placeholder="Nome do produto"
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
                            <th>Tipo</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosPagina.length > 0 ? (
                            produtosPagina.map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.tipo}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.quantidade}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>Nenhum produto/serviço encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
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

export default ComprasH;
