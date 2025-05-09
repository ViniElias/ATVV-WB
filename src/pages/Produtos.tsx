import React, { Component } from 'react';
import Card from '../components/Card/Card';
import CadProduto from '../components/Forms/CadProduto';

type State = {
  selectedCard: string | null;
};

export default class Produtos extends Component<{}, State> {
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
        return <CadProduto />
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
        <h2 className="page-title">Produtos</h2>
        <div className="cards">
          <Card
            title="Cadastrar"
            text="Adicione um novo produto ao sistema."
            click={() => this.selectCard('Cadastrar Produto')}
          />
          <Card
            title="Excluir"
            text="Remova um produto já existente."
            click={() => this.selectCard('Excluir Produto')}
          />
          <Card
            title="Atualizar"
            text="Atualize os dados de um produto."
            click={() => this.selectCard('Atualizar Produto')}
          />
          <Card
            title="Listar"
            text="Veja a lista de todos os produtos cadastrados."
            click={() => this.selectCard('Listar Produtos')}
          />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}