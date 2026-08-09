import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://chatbot-backend-0qz4.onrender.com";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('chatbot_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('chatbot_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem('chatbot_token', token);
    } else {
      localStorage.removeItem('chatbot_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('chatbot_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chatbot_user');
    }
  }, [user]);

  const signup = async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data === 'string' ? data : 'Signup failed');
      setToken(data.token);
      setUser({ name: data.name, email: data.email });
      return true;
    } catch (err) {
      setError(err.message || 'Signup failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data === 'string' ? data : 'Login failed');
      setToken(data.token);
      setUser({ name: data.name, email: data.email });
      return true;
    } catch (err) {
      setError(err.message || 'Invalid email or password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, error, setError, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}