import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Investment } from '../types/supabase';

export function useInvestments(userId: string | undefined) {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchInvestments = async () => {
      try {
        const { data, error } = await supabase
          .from('investments')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setInvestments(data as Investment[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userId]);

  const addInvestment = async (investment: Omit<Investment, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      setInvestments((prev) => [data as Investment, ...prev]);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateInvestment = async (id: string, updates: Partial<Investment>) => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setInvestments((prev) =>
        prev.map((investment) => (investment.id === id ? (data as Investment) : investment))
      );
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteInvestment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setInvestments((prev) => prev.filter((investment) => investment.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    investments,
    loading,
    error,
    addInvestment,
    updateInvestment,
    deleteInvestment,
  };
}