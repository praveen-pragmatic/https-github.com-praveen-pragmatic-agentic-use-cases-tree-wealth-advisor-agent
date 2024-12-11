import { useState, useEffect } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import * as authApi from '@/lib/api/supabase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    authApi.getCurrentSession().then((session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = authApi.onAuthStateChange((session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await authApi.signInWithEmail(email, password);
      setUser(user);
    } catch (err) {
      setError(err as AuthError);
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { user } = await authApi.signUpWithEmail(email, password);
      setUser(user);
    } catch (err) {
      setError(err as AuthError);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
      setUser(null);
    } catch (err) {
      setError(err as AuthError);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
}