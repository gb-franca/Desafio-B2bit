import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes da Aplicação
import SignIn from './pages/SignIn/SignIn';
// Importa o componente de Perfil
import Profile from './pages/Profile/Profile'; 
// Importa o componente para Rotas não existentes
import NotFound from './pages/NotFound/NotFound'; 
// Componente de Proteção de Rotas
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; 
// Provider do Contexto de Autenticação
import { AuthProvider } from './context/AuthContext'; 

const App: React.FC = () => {
  return(
    // Envolve toda a aplicação com o AuthProvider
    <AuthProvider> 
      <BrowserRouter>
        <Routes>
          
          {/* Rota de Login: Acessível a todos */}
          <Route path="/" element={<SignIn />} />
          
          {/* Rota de Perfil: Protegida. Requer autenticação. */}
          <Route 
            path="/profile" 
            element={<ProtectedRoute element={<Profile />} />} 
          />
          
          {/* Rota 404/Not Found: Captura qualquer URL não mapeada */}
          {/* O asterisco (*) no path é o coringa para qualquer rota não definida acima */}
          <Route path="*" element={<NotFound />} /> 
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;