import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const Clientes = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const renderForm = () => {
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

  return (
    <div>
      <h2 className="page-title">Clientes</h2>
      <div className="cards">
        <Card
          title="Cadastrar"
          text="Realize o cadastro de um novo cliente."
          click={() => setSelectedCard('Cadastrar')}
        />
        <Card
          title="Excluir"
          text="Exclua o cadastro de um cliente buscando pelo CPF."
          click={() => setSelectedCard('Excluir')}
        />
        <Card
          title="Atualizar"
          text="Atualize as informações de um cliente buscando pelo CPF."
          click={() => setSelectedCard('Atualizar')}
        />
        <Card
          title="Pesquisar"
          text="Exiba todos os clientes registrados."
          click={() => setSelectedCard('Pesquisar')}
        />
      </div>
      {renderForm()}
    </div>
  );
};

const App = () => {
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
};

export default App;