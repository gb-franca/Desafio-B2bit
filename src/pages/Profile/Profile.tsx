import React, { useState, useEffect } from 'react';
import CardContainer from '../../components/CardContainer/CardContainer';
import './Profile.css';
import { useAuth, PROFILE_URL } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

// Interface com os campos do perfil (nome completo, email, URL da imagem)
interface UserProfile {
  fullName: string;
  email: string;
  profilePictureUrl: string;
}

const Profile: React.FC = () => {
  // Hooks para contexto e navegação
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  
  // Estados para dados, carregamento e erro
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar os dados do usuário ao montar o componente
  useEffect(() => {
    // Se não houver token, para o carregamento e exibe erro
    if (!token) {
      setLoading(false);
      setError("Token não encontrado. Faça login novamente.");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true); // Garante que o estado de loading é ativado
      setError(null);  // Limpa erros anteriores

      try {
        const response = await fetch(PROFILE_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });

        // Lógica para tratamento de erro (incluindo logout forçado)
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            logout(); 
            navigate('/'); // Redireciona após logout
            throw new Error('Sessão expirada. Faça login novamente.');
          }
          throw new Error('Falha ao carregar os dados do perfil.');
        }

        const data = await response.json();
        
        // Mapeia e define o estado do usuário
        setUser({
          fullName: `${data.name} ${data.last_name}`, 
          email: data.email,
          profilePictureUrl: data.avatar.medium, 
        });

      } catch (err) {
        // Captura e define a mensagem de erro
        setError(err instanceof Error ? err.message : 'Erro desconhecido.');
        console.error("Erro ao buscar perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, logout, navigate]); // Dependências: re-executa se token, logout ou navigate mudarem
  
  // --- Funções Auxiliares de Renderização ---
  
  // Exibe a mensagem de carregamento ou erro
  const renderStatus = () => {
    if (loading) {
      return <div style={{ textAlign: 'center' }}>Carregando dados do perfil...</div>;
    }
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    return null; // Não exibe nada se não for loading nem erro
  };

  // Se estiver carregando ou houver erro, exibe apenas a mensagem dentro do CardContainer
  if (loading || error) {
    const statusContent = renderStatus();
    if (statusContent) {
      return (
        <>
          <Header />
          <CardContainer>
            {statusContent}
          </CardContainer>
        </>
      );
    }
  }

  // Se o carregamento terminou, mas 'user' é nulo (caso inesperado)
  if (!user) {
    return (
      <>
        <Header />
        <CardContainer>
          <div style={{ textAlign: 'center' }}>Não foi possível carregar as informações do usuário.</div>
        </CardContainer>
      </>
    );
  }

  // --- Renderização do Perfil (FINAL) ---
  return (
    <>
      <Header /> 
      
      <CardContainer> 
        {/* Seção da foto de perfil */}
        <div className="profile-header">
          <h2>Profile picture</h2>
          <img
            src={user.profilePictureUrl} 
            alt="Foto de Perfil"
            className="profile-pic"
          />
        </div>

        {/* Informação do nome */}
        <div className="profile-info-group">
          <label>Your Name</label>
          <div className="info-display">{user.fullName}</div>
        </div>

        {/* Informação do email */}
        <div className="profile-info-group">
          <label>Your E-mail</label>
          <div className="info-display">{user.email}</div>
        </div>

      </CardContainer>
    </>
  );
};

export default Profile;