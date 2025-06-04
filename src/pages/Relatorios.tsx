import React, { Component } from 'react';
import Card from '../components/Card/Card';
import MaiorQntd from '../components/Table/MaiorQntd';
import MenorQntd from '../components/Table/MenorQntd';
import MaiorValor from '../components/Table/MaiorValor';
import TabelaClientes from '../components/Table/TabelaCliente';
import PrSrGeral from '../components/Table/PrSrGeral';
import ComprasH from '../components/Table/ComprasH';
import ComprasM from '../components/Table/ComprasM';

type State = {
  selectedCard: string | null;
};

export default class Relatorios extends Component<{}, State> {
  state: State = {
    selectedCard: null
  };

  selectCard = (title: string) => {
    this.setState({ selectedCard: title });
  };

  renderContent = () => {
    const { selectedCard } = this.state;
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

  render() {
    return (
      <div>
        <h2 className="page-title">Relatórios</h2>
        <div className="cards">
          <Card
            title="Maiores consumidores em quantidade"
            text="Liste os 10 clientes que mais compraram (em quantidade, não valor)."
            click={() => this.selectCard('Maior quantidade')}
          />
          <Card
            title="Listar todos os clientes"
            text="Liste todos os clientes cadastrados, ordenados por gênero."
            click={() => this.selectCard('Listar todos')}
          />
          <Card
            title="Produtos e serviços mais consumidos"
            text="Liste os produtos e serviços mais consumidos no geral."
            click={() => this.selectCard('Geral')}
          />
        </div>
        <div className="cards">
          <Card
            title="Produtos e serviços por gênero"
            text="Liste os produtos e serviços mais consumidos por gênero."
            click={() => this.selectCard('Compras gênero')}
          />
          <Card
            title="Menores consumidores em quantidade"
            text="Liste os 10 clientes que menos compraram (em quantidade, não valor)."
            click={() => this.selectCard('Menor quantidade')}
          />
          <Card
            title="Maiores consumidores em valor"
            text="Liste os 5 clientes que mais gastaram."
            click={() => this.selectCard('Maior valor')}
          />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}