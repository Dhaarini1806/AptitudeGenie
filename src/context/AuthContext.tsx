
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  level: number;
  streakDays: number;
  lastPlayed: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("aptitude-genie-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function (replace with real API call)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock user (In a real app, this would come from your backend)
    const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      points: 0,
      level: 1,
      streakDays: 0,
      lastPlayed: null
    };
    
    setUser(mockUser);
    localStorage.setItem("aptitude-genie-user", JSON.stringify(mockUser));
    setIsLoading(false);
  };
  
  // Mock register function (replace with real API call)
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user (In a real app, this would be created in your backend)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      points: 0,
      level: 1,
      streakDays: 0,
      lastPlayed: null
    };
    
    setUser(newUser);
    localStorage.setItem("aptitude-genie-user", JSON.stringify(newUser));
    setIsLoading(false);
  };
  
  // Mock logout function
  const logout = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    localStorage.removeItem("aptitude-genie-user");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
