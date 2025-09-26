import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importe o seu useAuth

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Se ainda estiver carregando (verificando o token inicial), não faz nada
  if (isLoading) {
    return <div>Verificando autenticação...</div>; 
  }

  // Se estiver autenticado, renderiza o elemento solicitado (Profile)
  if (isAuthenticated) {
    return <>{element}</>;
  }

  // Se não estiver autenticado, redireciona para a página de login
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;