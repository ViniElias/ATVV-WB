import React, { Component } from 'react';
import Card from '../components/Card/Card';
import CadProduto from '../components/Forms/CadProduto';
import TabelaProdutos from '../components/Table/TabelaProduto';
import ExcProduto from '../components/Forms/ExcProduto';
import AtlProduto from '../components/Forms/AtlProduto';

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
        return <ExcProduto />
      case 'Atualizar Produto':
        return <AtlProduto />
      case 'Listar Produtos':
        return <TabelaProdutos />
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
            text="Remova um produto já existente buscando pelo ID."
            click={() => this.selectCard('Excluir Produto')}
          />
          <Card
            title="Atualizar"
            text="Atualize os dados de um produto buscando pelo ID."
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