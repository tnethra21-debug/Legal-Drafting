// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlockedBadge, setUnlockedBadge] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('legaldraft_token');
      if (token) {
        api.setToken(token);
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          }
        } catch (err) {
          console.warn('Session expired or backend offline:', err.message);
          // Fallback to local session if present
          const cachedUser = localStorage.getItem('legaldraft_cached_user');
          if (cachedUser) {
            try { setUser(JSON.parse(cachedUser)); } catch (e) {}
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success) {
      api.setToken(res.token);
      setUser(res.user);
      localStorage.setItem('legaldraft_cached_user', JSON.stringify(res.user));
    }
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success) {
      api.setToken(res.token);
      setUser(res.user);
      localStorage.setItem('legaldraft_cached_user', JSON.stringify(res.user));
    }
    return res;
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
    localStorage.removeItem('legaldraft_cached_user');
  };

  const updateUserProfile = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('legaldraft_cached_user', JSON.stringify(updated));
      return updated;
    });
  };

  const addXPLocally = (points) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, xp: (prev.xp || 0) + points };
      localStorage.setItem('legaldraft_cached_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
        addXPLocally,
        unlockedBadge,
        setUnlockedBadge
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
