import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

type Props = {};

export default class Header extends Component<Props> {
  render() {
    return (
      <header className="header">
        <Link to="/clientes"><h1>World Beauty</h1></Link>
        <nav>
          <ul className="nav-list">
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/relatorios">Relatórios</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}