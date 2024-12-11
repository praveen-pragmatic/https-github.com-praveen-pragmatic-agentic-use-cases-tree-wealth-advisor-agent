import { supabase } from '../client';
import type { Investment } from '@/types/supabase';

export async function fetchInvestments(userId: string) {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Investment[];
}

export async function createInvestment(investment: Omit<Investment, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('investments')
    .insert([investment])
    .select()
    .single();

  if (error) throw error;
  return data as Investment;
}

export async function updateInvestment(id: string, updates: Partial<Investment>) {
  const { data, error } = await supabase
    .from('investments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Investment;
}

export async function deleteInvestment(id: string) {
  const { error } = await supabase
    .from('investments')
    .delete()
    .eq('id', id);

  if (error) throw error;
}