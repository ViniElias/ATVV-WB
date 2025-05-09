import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import Produtos from './Produtos';
import Servicos from './Servicos';
import Relatorios from './Relatorios';
import CadCliente from '../components/Forms/CadCliente';
import ExcCliente from '../components/Forms/ExcCliente';
import AtlCliente from '../components/Forms/AtlCliente';
import TabelaCliente from '../components/Table/TabelaCliente';

type State = {
  selectedCard: string | null;
};

class Clientes extends Component<{}, State> {
  state: State = {
    selectedCard: null
  };

  selectCard = (title: string) => {
    this.setState({ selectedCard: title });
  };

  renderForm = () => {
    const { selectedCard } = this.state;
    switch (selectedCard) {
      case 'Cadastrar':
        return <CadCliente />;
      case 'Excluir':
        return <ExcCliente />;
      case 'Atualizar':
        return <AtlCliente />;
      case 'Pesquisar':
        return <TabelaCliente />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <h2 className="page-title">Clientes</h2>
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
            text="Exiba os clientes registrados."
            click={() => this.selectCard('Pesquisar')}
          />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Routes>
      </div>
    );
  }
}