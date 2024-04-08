import React from 'react';

import './center.css'; 
import { Link } from 'react-router-dom';

const MainContent = () => {
  return (
    <main className="main">
    <div className="content">
      <h1>Desbrave seu próprio caminho</h1>
      <p>Estamos aqui para inspirar e capacitar você a criar seus próprios caminhos alcançar suas metas.Metas ou sonhos vamos juntos transformar  em realidade.</p>
      <Link to='/criar-projeto' className='btn home'>Comece a criar agora!</Link>
    </div>
  </main>
  );
};

export default MainContent;
