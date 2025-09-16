import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

// User profile shape matching your Supabase profile table
interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  points: number;
  level: number;
  streak_days: number;
  last_played: string | null;
  is_admin: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to fetch full profile from Supabase
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.warn('Error fetching user profile:', error.message);
      return null;
    }
    return data as UserProfile | null;
  };

  const refreshUserProfile = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const profile = await fetchUserProfile(session.user.id);
      setUser(profile);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Initial load: get session and profile if logged in
    const initializeUser = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      }
      setIsLoading(false);
    };
    initializeUser();

    // Live session updates
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Supabase-powered login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  // Supabase-powered register + create profile row
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setIsLoading(false);
      throw new Error(error.message);
    }
    if (!data.user) {
      setIsLoading(false);
      throw new Error('User creation failed');
    }

    // Check if profile already exists before inserting
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', data.user.id)
      .single();

    if (!existingProfile) {
      // Insert the new profile row
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: data.user.id,
          email,
          name,
          points: 0,
          level: 1,
          streak_days: 0,
          last_played: null,
          is_admin: false,
        }]);
      if (profileError) {
        setIsLoading(false);
        throw new Error(profileError.message);
      }
    }

    setIsLoading(false);
  };

  // Supabase-powered logout
  const logout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setIsLoading(false);
      throw new Error(error.message);
    }
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth context consumer hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth must be used within AuthProvider');
  return context;
}
