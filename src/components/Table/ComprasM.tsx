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

const ComprasM = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);

    const produtos: Produto[] = [
        { id: 1, nome: 'Progressiva', tipo: 'Serviço', preco: '120,00', genero: 'Feminino', quantidade: 33 },
        { id: 2, nome: 'Coloração capilar', tipo: 'Serviço', preco: '80,00', genero: 'Feminino', quantidade: 31 },
        { id: 3, nome: 'Máscara Hidratante', tipo: 'Produto', preco: '35,90', genero: 'Feminino', quantidade: 29 },
        { id: 4, nome: 'Leave-in Reconstrutor', tipo: 'Produto', preco: '29,50', genero: 'Feminino', quantidade: 28 },
        { id: 5, nome: 'Shampoo Matizador', tipo: 'Produto', preco: '33,00', genero: 'Feminino', quantidade: 25 },
        { id: 6, nome: 'Spray de Brilho', tipo: 'Produto', preco: '24,90', genero: 'Feminino', quantidade: 24 },
        { id: 7, nome: 'Escova modeladora', tipo: 'Serviço', preco: '35,00', genero: 'Feminino', quantidade: 21 },
        { id: 8, nome: 'Selagem térmica', tipo: 'Serviço', preco: '110,00', genero: 'Feminino', quantidade: 20 },
        { id: 9, nome: 'Máscara Matizadora', tipo: 'Produto', preco: '38,50', genero: 'Feminino', quantidade: 20 },
        { id: 10, nome: 'Kit Completo Hidratação', tipo: 'Produto', preco: '85,00', genero: 'Feminino', quantidade: 19 }
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
                <h2>Produtos/serviços mais comprados (mulheres)</h2>
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

            <div>
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
            </div>
        </>
    );
};

export default ComprasM;