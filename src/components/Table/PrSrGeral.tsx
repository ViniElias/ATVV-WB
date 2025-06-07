import { useState, ChangeEvent } from 'react';
import './Tabela.css';

type Produto = {
    id: number;
    nome: string;
    preco: string;
    tipo: string;
    quantidade: number;
};

const PrSrGeral = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);

    const produtos: Produto[] = [
        { id: 1, nome: 'Corte de cabelo', tipo: 'Serviço', preco: '30,00', quantidade: 32 },
        { id: 2, nome: 'Shampoo Anticaspa', tipo: 'Produto', preco: '30,00', quantidade: 29 },
        { id: 3, nome: 'Progressiva', tipo: 'Serviço', preco: '120,00', quantidade: 28 },
        { id: 4, nome: 'Gel Fixador Forte', tipo: 'Produto', preco: '18,00', quantidade: 26 },
        { id: 5, nome: 'Máscara Hidratante', tipo: 'Produto', preco: '35,90', quantidade: 25 },
        { id: 6, nome: 'Barba completa', tipo: 'Serviço', preco: '25,00', quantidade: 23 },
        { id: 7, nome: 'Tônico Capilar', tipo: 'Produto', preco: '40,00', quantidade: 21 },
        { id: 8, nome: 'Coloração capilar', tipo: 'Serviço', preco: '80,00', quantidade: 19 },
        { id: 9, nome: 'Leave-in Reconstrutor', tipo: 'Produto', preco: '29,50', quantidade: 18 },
        { id: 10, nome: 'Pomada Modeladora', tipo: 'Produto', preco: '27,00', quantidade: 17 },
        { id: 11, nome: 'Sérum Reparador', tipo: 'Produto', preco: '36,80', quantidade: 15 },
        { id: 12, nome: 'Selagem térmica', tipo: 'Serviço', preco: '110,00', quantidade: 14 },
        { id: 13, nome: 'Máscara Matizadora', tipo: 'Produto', preco: '38,50', quantidade: 13 },
        { id: 14, nome: 'Platinado masculino', tipo: 'Serviço', preco: '90,00', quantidade: 12 },
        { id: 15, nome: 'Escova modeladora', tipo: 'Serviço', preco: '35,00', quantidade: 12 }
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
                <h2>Produtos/serviços mais comprados</h2>

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

export default PrSrGeral;
