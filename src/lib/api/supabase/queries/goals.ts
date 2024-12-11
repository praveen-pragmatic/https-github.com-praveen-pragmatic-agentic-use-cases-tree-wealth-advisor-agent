import { supabase } from '../client';
import type { FinancialGoal } from '@/types/supabase';

export async function fetchGoals(userId: string) {
  const { data, error } = await supabase
    .from('financial_goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as FinancialGoal[];
}

export async function createGoal(goal: Omit<FinancialGoal, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('financial_goals')
    .insert([goal])
    .select()
    .single();

  if (error) throw error;
  return data as FinancialGoal;
}

export async function updateGoal(id: string, updates: Partial<FinancialGoal>) {
  const { data, error } = await supabase
    .from('financial_goals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as FinancialGoal;
}

export async function deleteGoal(id: string) {
  const { error } = await supabase
    .from('financial_goals')
    .delete()
    .eq('id', id);

  if (error) throw error;
}