
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // This is a mock login - in a real app, you would call your API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email === 'admin@example.com' && password === 'password') {
          const user = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=random'
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
          toast.success('Successfully logged in');
          navigate('/dashboard');
          resolve(user);
        } else if (email === 'user@example.com' && password === 'password') {
          const user = {
            id: '2',
            name: 'Team Member',
            email: 'user@example.com',
            role: 'member',
            avatar: 'https://ui-avatars.com/api/?name=Team+Member&background=random'
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
          toast.success('Successfully logged in');
          navigate('/dashboard');
          resolve(user);
        } else {
          toast.error('Invalid credentials');
          reject(new Error('Invalid credentials'));
        }
      }, 800); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    toast.success('Successfully logged out');
    navigate('/login');
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
