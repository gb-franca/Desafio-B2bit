import React, { createContext, useState, useContext, useEffect } from 'react';
import type {ReactNode} from 'react';

// --- Constantes ---
// URL para o POST de Login
const LOGIN_URL = 'https://api.homologation.cliqdrive.com.br/auth/login/'; 
// URL para o GET de Perfil
export const PROFILE_URL = 'https://api.homologation.cliqdrive.com.br/auth/profile/'; 
// Chave do LocalStorage
const STORAGE_KEY = '@MyApp:token'; 

// --- Interfaces ---

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Criação do Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// --- O Provider (Lógica Principal) ---

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Carrega o token do LocalStorage no montante
  useEffect(() => {
    const loadToken = () => {
      const storedToken = localStorage.getItem(STORAGE_KEY);
      if (storedToken) {
        setToken(storedToken);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  // Função de Login: faz a requisição, salva o token e atualiza o estado
  const login = async ({ email, password }: AuthCredentials) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;version=v1_web',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Lança erro para ser capturado no componente de SignIn
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Credenciais Inválidas.');
      }
      
      const data = await response.json();
      const newToken = data?.tokens?.access; 
      
      if (!newToken) {
          throw new Error('Token de acesso não encontrado.');
      }

      // Salva no LocalStorage e no estado
      localStorage.setItem(STORAGE_KEY, newToken); 
      setToken(newToken);

    } catch (error) {
      console.error("Erro no Login:", error);
      throw error; 
    }
  };

  // Função de Logout: remove o token do LocalStorage e limpa o estado
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  };

  // Valor do Contexto
  const contextValue: AuthContextType = {
    isAuthenticated: !!token, // True se houver token
    token,
    login,
    logout,
    isLoading,
  };

  // Renderização: Exibe o conteúdo apenas após o carregamento inicial
  if (isLoading) {
    // Pode retornar um spinner/loader aqui para evitar flickering
    return <div>Carregando autenticação...</div>; 
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


// Hook customizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};