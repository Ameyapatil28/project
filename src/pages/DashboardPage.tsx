import { TrendingUp, TrendingDown, AlertTriangle, Wallet, ShoppingBag, ArrowUp } from 'lucide-react';
import { Expense } from '../types';
import { calculateCategorySummary, calculateMonthlySpending, calculateInsights } from '../utils/calculations';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

interface DashboardPageProps {
  expenses: Expense[];
}

export default function DashboardPage({ expenses }: DashboardPageProps) {
  const categorySummary = calculateCategorySummary(expenses);
  const monthlySpending = calculateMonthlySpending(expenses);
  const insights = calculateInsights(expenses);

  const showAlert = insights.budgetPercentage < 20;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your spending patterns and financial insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${insights.monthlyTrend > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {insights.monthlyTrend > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(insights.monthlyTrend).toFixed(1)}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Spent This Month</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{insights.totalSpent.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Top Category</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {insights.topCategory}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <ArrowUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Budget Remaining</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{insights.budgetRemaining.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Budget Usage</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(100 - insights.budgetPercentage).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
              Budget Alert!
            </h3>
            <p className="text-red-800 dark:text-red-200">
              You've used {(100 - insights.budgetPercentage).toFixed(0)}% of your monthly budget. Consider reducing discretionary spending.
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Category-wise Expenses
          </h2>
          <PieChart data={categorySummary} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Monthly Spending Trend
          </h2>
          <BarChart data={monthlySpending} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-3">
          {expenses.slice(0, 5).map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-medium text-sm">
                  {expense.category[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {expense.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {expense.date.toLocaleDateString()} • {expense.category}
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{expense.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
