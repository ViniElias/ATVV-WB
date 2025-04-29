import React, { Component } from 'react';
import './Header.css';

type Props = {};

export default class Header extends Component<Props> {
  render() {
    return (
      <header className="header">
        <h1>World Beauty</h1>
        <nav>
          <ul className="nav-list">
            <li><a href="#clientes">Clientes</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#relatorios">Relatórios</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}