import React, { Component } from 'react';
import Card from '../components/Card/Card';

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
      case 'Cadastrar Produto':
        return <p>Formulário de cadastro de produto (em construção)</p>;
      case 'Excluir Produto':
        return <p>Formulário de exclusão de produto (em construção)</p>;
      case 'Atualizar Produto':
        return <p>Formulário de atualização de produto (em construção)</p>;
      case 'Listar Produtos':
        return <p>Lista de produtos (em construção)</p>;
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
            click={() => this.selectCard('Cadastrar Produto')}
          />
          <Card
            title="Listar todos os clientes"
            text="Liste todos os clientes cadastrados, ordenados por gênero."
            click={() => this.selectCard('Excluir Produto')}
          />
          <Card
            title="Produtos e serviços mais consumidos"
            text="Liste os produtos e serviços mais consumidos no geral."
            click={() => this.selectCard('Atualizar Produto')}
          />
        </div>
        <div className="cards">
          <Card
            title="Produtos e serviços por gênero"
            text="Liste os produtos e serviços mais consumidos por gênero."
            click={() => this.selectCard('Listar Produtos')}
          />
          <Card
            title="Menores consumidores em quantidade"
            text="Liste os 10 clientes que menos compraram (em quantidade, não valor)."
            click={() => this.selectCard('Listar Produtos')}
          />
          <Card
            title="Maiores consumidores em valor"
            text="Liste os 5 clientes que mais gastaram."
            click={() => this.selectCard('Listar Produtos')}
          />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}