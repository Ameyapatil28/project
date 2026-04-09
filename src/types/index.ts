export type ExpenseCategory =
  | 'Food'
  | 'Travel'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Personal'
  | 'Healthcare'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
  source: 'SMS' | 'UPI' | 'Bank' | 'Manual';
  merchantName?: string;
}

export interface CategorySummary {
  category: ExpenseCategory;
  total: number;
  percentage: number;
  count: number;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export interface InsightData {
  totalSpent: number;
  topCategory: ExpenseCategory;
  topCategoryAmount: number;
  topCategoryTrend: number;
  budgetRemaining: number;
  budgetPercentage: number;
  monthlyTrend: number;
  categoryComparison: string;
  comparisonLabel: string;
}
