import React, { Component } from 'react';
import "./App.css"
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import FormCadastro from './components/Forms/FormCadastro';

type State = {
  selectedCard: string | null;
};

export default class App extends Component<{}, State> {
  state: State = {
    selectedCard: null
  };

  selectCard = (title: string) => {
    this.setState({ selectedCard: title })
  }

  renderForm = () => {
    const {selectedCard} = this.state;
    switch(selectedCard) {
      case 'Cadastrar':
        return <FormCadastro />
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="cards">
          <Card
            title="Cadastrar"
            text="Realize o cadastro de um novo cliente."
            click={() => this.selectCard('Cadastrar')}
          />
          <Card
            title="Excluir"
            text="Exclua o cadastro de um cliente já existente."
            click={() => this.selectCard('Excluir')}
          />
          <Card
            title="Atualizar"
            text="Atualize as informações de um cliente."
            click={() => this.selectCard('Atualizar')}
          />
          <Card
            title="Pesquisar"
            text="Exiba os cliente registrados."
            click={() => this.selectCard('Pesquisar')}
          />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}