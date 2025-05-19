import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);  // Ініціалізація контексту

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  // Відновлення з localStorage 
  useEffect(() => {
    const savedUsername = localStorage.getItem("username"); // (гарантує збереження стану при перезавантаженні)
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};