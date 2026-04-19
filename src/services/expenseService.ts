import supabase from '../supabaseClient';
import { Expense } from '../types';

export const fetchExpenses = async (): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }

  // Map snake_case from DB back to camelCase App model
  return data.map((item: any) => ({
    id: item.id,
    amount: Number(item.amount),
    category: item.category,
    description: item.description,
    date: new Date(item.date),
    source: item.source,
    merchantName: item.merchant_name,
  }));
};

export const addExpense = async (expense: Omit<Expense, 'id'>): Promise<{ data: Expense | null; error: string | null }> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return { data: null, error: "Not logged in" };

  // Insert formatting Date directly into SQL Date standard
  const { data, error } = await supabase
    .from('expenses')
    .insert([
      {
        user_id: userData.user.id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date.toISOString().split('T')[0],
        source: expense.source,
        merchant_name: expense.merchantName || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error inserting expense:', error);
    return { data: null, error: error.message };
  }

  return {
    data: {
      id: data.id,
      amount: Number(data.amount),
      category: data.category,
      description: data.description,
      date: new Date(data.date),
      source: data.source,
      merchantName: data.merchant_name,
    },
    error: null
  };
};

export const deleteExpense = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting expense:', error);
    return false;
  }

  return true;
};
