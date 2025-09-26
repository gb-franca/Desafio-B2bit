import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css'; 

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Função para lidar com o Logout
  const handleLogout = () => {
    logout(); // Remove o token
    navigate('/'); // Redireciona para o Login
  };

  return (
    <header className="app-header">
      <div className="header-content"> 
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;