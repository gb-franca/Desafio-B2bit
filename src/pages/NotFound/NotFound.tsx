import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px' }}>
      <h1>404 - Página Não Encontrada</h1>
      <p>A URL que você tentou acessar não existe.</p>
    </div>
  );
};

export default NotFound;