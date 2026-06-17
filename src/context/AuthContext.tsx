import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { safeStorage } from '../lib/storage';

export interface CustomUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  role?: string;
  isCustom?: boolean;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  loginCustomUser: (email: string, role?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginCustomUser: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage safely first for initial state
    const stored = safeStorage.getLocal('oneroof_custom_user');
    let initialUser: CustomUser | null = null;
    if (stored) {
      try {
        initialUser = JSON.parse(stored);
        setUser(initialUser);
      } catch (e) {
        safeStorage.removeLocal('oneroof_custom_user');
      }
    }

    // Subscribe to firebase auth state listener to merge and verify real active sessions
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      const storedNow = safeStorage.getLocal('oneroof_custom_user');
      let customUser: CustomUser | null = null;
      if (storedNow) {
        try {
          customUser = JSON.parse(storedNow);
        } catch {
          // ignore
        }
      }

      if (u) {
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName || customUser?.displayName || 'Authorized Admin',
          role: customUser?.role || (u.email === 'editor@oneroofsolar.com.au' ? 'Editor' : 'Administrator'),
          isCustom: false, // Fully authenticated with Firebase, so it's not local-only!
        });
      } else {
        if (customUser) {
          // Fallback to custom user if we are in local sandbox mode
          setUser(customUser);
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    }, (error) => {
      console.error("Auth state changed error:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginCustomUser = (email: string, role: string = 'Administrator') => {
    const custom: CustomUser = {
      uid: 'custom-' + Math.random().toString(36).substring(2, 9),
      email: email,
      displayName: 'Oneroof Custom Admin',
      role: role,
      isCustom: true,
    };
    safeStorage.setLocal('oneroof_custom_user', JSON.stringify(custom));
    setUser(custom);
  };

  const logout = async () => {
    safeStorage.removeLocal('oneroof_custom_user');
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginCustomUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
