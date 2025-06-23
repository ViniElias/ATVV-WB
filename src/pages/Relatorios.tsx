import { useState } from 'react';
import Card from '../components/Cards/Card';
import MaiorQntd from '../components/Table/MaiorQntd';
import MenorQntd from '../components/Table/MenorQntd';
import MaiorValor from '../components/Table/MaiorValor';
import TabelaClientes from '../components/Table/TabelaCliente';
import PrSrGeral from '../components/Table/PrSrGeral';
import ComprasH from '../components/Table/ComprasH';
import ComprasM from '../components/Table/ComprasM';

const Relatorios = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const renderContent = () => {
    switch (selectedCard) {
      case 'Maior quantidade':
        return <MaiorQntd />
      case 'Menor quantidade':
        return <MenorQntd />
      case 'Maior valor':
        return <MaiorValor />
      case 'Listar todos':
        return <TabelaClientes />
      case 'Compras gênero':
        return <div className='tabelasGenero'>
          <ComprasH />
          <ComprasM />
        </div>
      case 'Geral':
        return <PrSrGeral />
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="page-title">Relatórios</h2>
      <div className="cards">
        <Card
          title="Maiores consumidores em quantidade"
          text="Liste os clientes que mais compraram (em quantidade, não valor)."
          click={() => setSelectedCard('Maior quantidade')}
        />
        <Card
          title="Listar todos os clientes"
          text="Liste todos os clientes cadastrados, ordenados por gênero."
          click={() => setSelectedCard('Listar todos')}
        />
        <Card
          title="Produtos e serviços mais consumidos"
          text="Liste os produtos e serviços mais consumidos no geral."
          click={() => setSelectedCard('Geral')}
        />
      </div>
      <div className="cards">
        <Card
          title="Produtos e serviços por gênero"
          text="Liste os produtos e serviços mais consumidos por gênero."
          click={() => setSelectedCard('Compras gênero')}
        />
        <Card
          title="Menores consumidores em quantidade"
          text="Liste os clientes que menos compraram (em quantidade, não valor)."
          click={() => setSelectedCard('Menor quantidade')}
        />
        <Card
          title="Maiores consumidores em valor"
          text="Liste os clientes que mais gastaram."
          click={() => setSelectedCard('Maior valor')}
        />
      </div>
      {renderContent()}
    </div>
  );
}

export default Relatorios;