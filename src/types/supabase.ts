export interface Profile {
  id: string;
  created_at: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface FinancialGoal {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  category: 'retirement' | 'investment' | 'savings' | 'debt' | 'other';
  status: 'active' | 'completed' | 'cancelled';
}

export interface Investment {
  id: string;
  created_at: string;
  user_id: string;
  type: 'stocks' | 'bonds' | 'real_estate' | 'crypto' | 'other';
  amount: number;
  description: string;
  status: 'active' | 'sold';
  purchase_date: string;
  sell_date?: string;
}