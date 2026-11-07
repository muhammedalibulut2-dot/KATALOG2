import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/catalog';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  isSupabaseActive: boolean;
}

const DEFAULT_PERSONNEL: UserProfile = {
  id: 'usr-cag-001',
  email: 'teknik@cagteknik.com',
  fullName: 'Çağ Teknik Saha Teknisyeni',
  role: 'technician',
  badgeNumber: 'ÇT-7492',
  branch: 'Merkez Teknik Servis',
  lastLogin: 'Bugün, 09:30'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cag_teknik_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'personel@cagteknik.com',
            fullName: session.user.user_metadata?.full_name || 'Çağ Teknik Yetkili Personeli',
            role: session.user.user_metadata?.role || 'technician',
            badgeNumber: session.user.user_metadata?.badge || 'ÇT-001',
            branch: session.user.user_metadata?.branch || 'Merkez Servis'
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || 'personel@cagteknik.com',
            fullName: session.user.user_metadata?.full_name || 'Çağ Teknik Yetkili Personeli',
            role: session.user.user_metadata?.role || 'technician',
            badgeNumber: session.user.user_metadata?.badge || 'ÇT-001',
            branch: session.user.user_metadata?.branch || 'Merkez Servis'
          };
          setUser(profile);
          localStorage.setItem('cag_teknik_user', JSON.stringify(profile));
        } else {
          setUser(null);
          localStorage.removeItem('cag_teknik_user');
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          throw error;
        }
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || 'Çağ Teknik Yetkili Personeli',
            role: data.user.user_metadata?.role || 'technician',
            badgeNumber: data.user.user_metadata?.badge || 'ÇT-9921',
            branch: 'Merkez Servis Departmanı'
          };
          setUser(profile);
          localStorage.setItem('cag_teknik_user', JSON.stringify(profile));
          return true;
        }
      }

      // Supabase henüz kurulmadıysa ya da hızlı giriş modundaysa:
      await new Promise(r => setTimeout(r, 400));
      const fallbackUser: UserProfile = {
        ...DEFAULT_PERSONNEL,
        email: email || DEFAULT_PERSONNEL.email,
        fullName: email.includes('admin') ? 'Çağ Teknik Servis Yöneticisi' : DEFAULT_PERSONNEL.fullName,
        role: email.includes('admin') ? 'service_manager' : 'technician',
        badgeNumber: 'ÇT-' + Math.floor(1000 + Math.random() * 9000),
      };
      setUser(fallbackUser);
      localStorage.setItem('cag_teknik_user', JSON.stringify(fallbackUser));
      return true;
    } catch (err) {
      console.error('Giriş hatası:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('cag_teknik_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        isSupabaseActive: isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth, bir AuthProvider içerisinde kullanılmalıdır.');
  }
  return context;
};
