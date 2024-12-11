import { useState, useEffect } from 'react';
import * as goalsApi from '@/lib/api/supabase/queries/goals';
import type { FinancialGoal } from '@/types/supabase';

export function useFinancialGoals(userId: string | undefined) {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchGoals = async () => {
      try {
        const data = await goalsApi.fetchGoals(userId);
        setGoals(data);
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
      const data = await goalsApi.createGoal(goal);
      setGoals((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateGoal = async (id: string, updates: Partial<FinancialGoal>) => {
    try {
      const data = await goalsApi.updateGoal(id, updates);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? data : goal))
      );
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await goalsApi.deleteGoal(id);
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