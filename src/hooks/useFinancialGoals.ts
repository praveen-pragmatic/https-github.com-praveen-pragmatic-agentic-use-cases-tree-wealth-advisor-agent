import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { FinancialGoal } from '../types/supabase';

export function useFinancialGoals(userId: string | undefined) {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchGoals = async () => {
      try {
        const { data, error } = await supabase
          .from('financial_goals')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setGoals(data as FinancialGoal[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [userId]);

  const addGoal = async (goal: Omit<FinancialGoal, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('financial_goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      setGoals((prev) => [data as FinancialGoal, ...prev]);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateGoal = async (id: string, updates: Partial<FinancialGoal>) => {
    try {
      const { data, error } = await supabase
        .from('financial_goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? (data as FinancialGoal) : goal))
      );
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('financial_goals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    goals,
    loading,
    error,
    addGoal,
    updateGoal,
    deleteGoal,
  };
}