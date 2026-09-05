import React, { createContext, useContext, useState, useEffect } from 'react';
import API_ENDPOINTS from '../config/api';

interface User {
  id: string;
  pseudo: string;
  email: string;
  avatar?: string;
  premium: boolean;
  unitos: number;
  scoreElo: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, pseudo: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('Stored token:', storedToken);
    console.log('Stored user:', storedUser);
    
    if (storedToken && storedUser) {
      console.log('Checking token validity...');
      fetch(`${API_ENDPOINTS.USERS}/me`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      })
        .then(response => {
          console.log('Token check response:', response.status);
          if (response.ok) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            console.log('Token valid, user authenticated');
          } else {
            console.log('Token invalid, logging out');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error('Token check error:', error);
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        });
    } else {
      console.log('No stored credentials found');
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login error data:', errorData);
        throw new Error(errorData.message || 'Échec de la connexion');
      }

      const data = await response.json();
      console.log('Login response data:', data);

      if (!data.token) {
        console.error('No token in response');
        throw new Error('Token manquant dans la réponse');
      }

      // Stockage du token et des données utilisateur
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);

      console.log('Login successful, token stored');
    } catch (err) {
      console.error('Login error:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (email: string, password: string, pseudo: string) => {
    try {
      console.log('Attempting registration with:', { email, pseudo });
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, pseudo }),
      });

      console.log('Registration response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Registration error data:', errorData);
        throw new Error(errorData.message || 'Échec de l\'inscription');
      }

      const data = await response.json();
      console.log('Registration successful, proceeding to login');
      
      // Après l'inscription réussie, connecter automatiquement l'utilisateur
      await login(email, password);
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
