import { useState } from 'react';
import Card from '../components/Card/Card';
import CadServico from '../components/Forms/CadServico';
import TabelaServicos from '../components/Table/TabelaServico';
import ExcServico from '../components/Forms/ExlServico';
import AtlServico from '../components/Forms/AtlServico';

const Servicos = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const renderContent = () => {
    switch (selectedCard) {
      case 'Cadastrar Produto':
        return <CadServico />
      case 'Excluir Produto':
        return <ExcServico />
      case 'Atualizar Produto':
        return <AtlServico />
      case 'Listar Serviços':
        return <TabelaServicos />
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="page-title">Serviços</h2>
      <div className="cards">
        <Card
          title="Cadastrar"
          text="Adicione um novo serviço ao sistema."
          click={() => setSelectedCard('Cadastrar Produto')}
        />
        <Card
          title="Excluir"
          text="Remova um serviço já existente."
          click={() => setSelectedCard('Excluir Produto')}
        />
        <Card
          title="Atualizar"
          text="Atualize os dados de um serviço."
          click={() => setSelectedCard('Atualizar Produto')}
        />
        <Card
          title="Listar"
          text="Veja a lista de todos os serviços cadastrados."
          click={() => setSelectedCard('Listar Serviços')}
        />
      </div>
      {renderContent()}
    </div>
  );
}

export default Servicos;