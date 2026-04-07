import { Expense, CategorySummary, MonthlySpending, InsightData } from '../types';

export function calculateCategorySummary(expenses: Expense[]): CategorySummary[] {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categoryTotals = new Map<string, { total: number; count: number }>();

  expenses.forEach((exp) => {
    const current = categoryTotals.get(exp.category) || { total: 0, count: 0 };
    categoryTotals.set(exp.category, {
      total: current.total + exp.amount,
      count: current.count + 1,
    });
  });

  return Array.from(categoryTotals.entries())
    .map(([category, data]) => ({
      category: category as any,
      total: data.total,
      percentage: (data.total / total) * 100,
      count: data.count,
    }))
    .sort((a, b) => b.total - a.total);
}

export function calculateMonthlySpending(expenses: Expense[]): MonthlySpending[] {
  const monthlyTotals = new Map<string, number>();

  expenses.forEach((exp) => {
    const monthKey = exp.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    monthlyTotals.set(monthKey, (monthlyTotals.get(monthKey) || 0) + exp.amount);
  });

  return Array.from(monthlyTotals.entries())
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

export function calculateInsights(expenses: Expense[]): InsightData {
  const totalBudget = 25000;
  const currentMonth = new Date().getMonth();
  const currentExpenses = expenses.filter((exp) => exp.date.getMonth() === currentMonth);

  const totalSpent = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categorySummary = calculateCategorySummary(currentExpenses);
  const topCategory = categorySummary[0]?.category || 'Food';

  const budgetRemaining = totalBudget - totalSpent;
  const budgetPercentage = (budgetRemaining / totalBudget) * 100;

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthExpenses = expenses.filter((exp) => exp.date.getMonth() === lastMonth.getMonth());
  const lastMonthTotal = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyTrend = lastMonthTotal > 0 ? ((totalSpent - lastMonthTotal) / lastMonthTotal) * 100 : 0;

  const categoryComparison = categorySummary.length > 0
    ? `You spent ${Math.abs(monthlyTrend).toFixed(0)}% ${monthlyTrend > 0 ? 'more' : 'less'} on ${topCategory} this month.`
    : 'Not enough data for comparison.';

  return {
    totalSpent,
    topCategory,
    budgetRemaining,
    budgetPercentage,
    monthlyTrend,
    categoryComparison,
  };
}
