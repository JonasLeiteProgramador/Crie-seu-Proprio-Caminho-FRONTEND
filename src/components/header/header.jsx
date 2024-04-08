import React from 'react';
import './header.css'; 
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="src/assets/images/logo.jpeg" alt="Logo" />
      </div>
      <div className="title">
        <h1> Seja bem vindo(a)</h1>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/criar-projeto">Adicione um projeto</Link>
          </li>

          <li>
            <Link to="/projetos">Ver projetos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
