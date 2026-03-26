import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check persistence on mount
    const storedUser = localStorage.getItem('automatch_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password.length >= 6) {
          const userData = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0],
            email,
            memberSince: 'Março 2024',
            photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
          };
          setUser(userData);
          localStorage.setItem('automatch_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Credenciais inválidas. Use uma senha com pelo menos 6 caracteres.'));
        }
      }, 800);
    });
  };

  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const userData = {
            id: 'user-' + Date.now(),
            name,
            email,
            memberSince: 'Março 2024',
            photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
          };
          setUser(userData);
          localStorage.setItem('automatch_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Por favor, preencha todos os campos corretamente.'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('automatch_user');
  };

  const updateProfile = async (updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...user, ...updates };
        setUser(newUser);
        localStorage.setItem('automatch_user', JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
