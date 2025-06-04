import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/userService';
import defaultAvatar from "/images/defaultAvatar.png";

interface AuthContextType {
  user: {
    username: string;
    avatarUrl: string | null;
  } | null;
  setUser: (user: AuthContextType["user"] | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);  // Ініціалізація контексту

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; avatarUrl: string | null } | null>(null);

  const refreshUser = async () => {
    const currentUser = await getCurrentUser(); // тип User

    setUser({
      username: currentUser.username,
      avatarUrl: currentUser.avatar?.url || defaultAvatar
    });
  };

  // Відновлення з localStorage 
  useEffect(() => {
    const savedUsername = localStorage.getItem("username"); // (гарантує збереження стану при перезавантаженні)
    if (savedUsername) {
      refreshUser();
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};