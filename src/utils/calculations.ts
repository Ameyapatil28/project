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

export function calculateInsights(expenses: Expense[], compareMonthIndex?: number, compareYear?: number): InsightData {
  const totalBudget = 25000;
  const currentMonth = new Date().getMonth();
  const currentExpenses = expenses.filter((exp) => exp.date.getMonth() === currentMonth);

  const totalSpent = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categorySummary = calculateCategorySummary(currentExpenses);
  const topCategory = categorySummary[0]?.category || 'Food';
  const topCategoryAmount = categorySummary[0]?.total || 0;

  const budgetRemaining = Math.max(0, totalBudget - totalSpent);
  const budgetPercentage = (budgetRemaining / totalBudget) * 100;

  let lastMonthExpenses: Expense[];

  if (compareMonthIndex !== undefined && compareYear !== undefined) {
    lastMonthExpenses = expenses.filter((exp) => exp.date.getMonth() === compareMonthIndex && exp.date.getFullYear() === compareYear);
  } else {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonthExpenses = expenses.filter((exp) => exp.date.getMonth() === lastMonth.getMonth() && exp.date.getFullYear() === lastMonth.getFullYear());
  }

  const lastMonthTotal = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyTrend = lastMonthTotal > 0 ? ((totalSpent - lastMonthTotal) / lastMonthTotal) * 100 : totalSpent > 0 ? 100 : 0;

  const topCategoryLastMonthExpenses = lastMonthExpenses.filter(exp => exp.category === topCategory);
  const topCategoryLastMonthTotal = topCategoryLastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const topCategoryTrend = topCategoryLastMonthTotal > 0 
    ? ((topCategoryAmount - topCategoryLastMonthTotal) / topCategoryLastMonthTotal) * 100 
    : topCategoryAmount > 0 ? 100 : 0;

  const categoryComparison = categorySummary.length > 0
    ? `You spent ${Math.abs(topCategoryTrend).toFixed(0)}% ${topCategoryTrend > 0 ? 'more' : 'less'} on ${topCategory} this month.`
    : 'Not enough data for comparison.';

  let comparisonLabel = 'last month';
  if (compareMonthIndex !== undefined && compareYear !== undefined) {
    const d = new Date(compareYear, compareMonthIndex);
    comparisonLabel = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  return {
    totalSpent,
    topCategory,
    topCategoryAmount,
    topCategoryTrend,
    budgetRemaining,
    budgetPercentage,
    monthlyTrend,
    categoryComparison,
    comparisonLabel // we should update InsightData to include comparisonLabel
  };
}
