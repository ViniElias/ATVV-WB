import { useState } from 'react';
import Card from '../components/Cards/Card';
import CadProduto from '../components/Forms/CadProduto';
import TabelaProdutos from '../components/Table/TabelaProduto';
import ExcProduto from '../components/Forms/ExcProduto';
import AtlProduto from '../components/Forms/AtlProduto';

const Produtos = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const renderContent = () => {
    switch (selectedCard) {
      case 'Cadastrar Produto':
        return <CadProduto />
      case 'Excluir Produto':
        return <ExcProduto />
      case 'Atualizar Produto':
        return <AtlProduto />
      case 'Listar Produtos':
        return <TabelaProdutos />
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="page-title">Produtos</h2>
      <div className="cards">
        <Card
          title="Cadastrar"
          text="Adicione um novo produto ao sistema."
          click={() => setSelectedCard('Cadastrar Produto')}
        />
        <Card
          title="Excluir"
          text="Remova um produto já existente buscando pelo ID."
          click={() => setSelectedCard('Excluir Produto')}
        />
        <Card
          title="Atualizar"
          text="Atualize os dados de um produto buscando pelo ID."
          click={() => setSelectedCard('Atualizar Produto')}
        />
        <Card
          title="Listar"
          text="Veja a lista de todos os produtos cadastrados."
          click={() => setSelectedCard('Listar Produtos')}
        />
      </div>
      {renderContent()}
    </div>
  );
}

export default Produtos;