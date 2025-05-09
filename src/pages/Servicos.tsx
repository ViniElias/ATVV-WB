import React, { Component } from 'react';
import Card from '../components/Card/Card';
import CadServico from '../components/Forms/CadServico';

type State = {
  selectedCard: string | null;
};

export default class Servicos extends Component<{}, State> {
  state: State = {
    selectedCard: null
  };

  selectCard = (title: string) => {
    this.setState({ selectedCard: title });
  };

  renderContent = () => {
    const { selectedCard } = this.state;
    switch (selectedCard) {
      case 'Cadastrar Produto':
        return <CadServico />
      case 'Excluir Produto':
        return <p>Formulário de exclusão de serviço (em construção)</p>;
      case 'Atualizar Produto':
        return <p>Formulário de atualização de serviço (em construção)</p>;
      case 'Listar Serviços':
        return <p>Lista de serviços (em construção)</p>;
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <h2 className="page-title">Serviços</h2>
        <div className="cards">
          <Card
            title="Cadastrar"
            text="Adicione um novo serviço ao sistema."
            click={() => this.selectCard('Cadastrar Produto')}
          />
          <Card
            title="Excluir"
            text="Remova um serviço já existente."
            click={() => this.selectCard('Excluir Produto')}
          />
          <Card
            title="Atualizar"
            text="Atualize os dados de um serviço."
            click={() => this.selectCard('Atualizar Produto')}
          />
          <Card
            title="Listar"
            text="Veja a lista de todos os serviços cadastrados."
            click={() => this.selectCard('Listar Serviços')}
          />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}