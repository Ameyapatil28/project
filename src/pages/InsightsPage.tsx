import { Lightbulb, Target, TrendingUp, PiggyBank, AlertCircle } from 'lucide-react';
import { Expense } from '../types';
import { calculateCategorySummary, calculateInsights } from '../utils/calculations';

interface InsightsPageProps {
  expenses: Expense[];
}

export default function InsightsPage({ expenses }: InsightsPageProps) {
  const categorySummary = calculateCategorySummary(expenses);
  const insights = calculateInsights(expenses);

  const recommendations = [
    {
      title: 'Reduce Food Delivery',
      description: 'You spent 30% more on food delivery this month. Consider cooking at home to save ₹2,000/month.',
      icon: PiggyBank,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Set Category Budgets',
      description: 'Create specific budgets for each category to track spending more effectively.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Monthly Savings Goal',
      description: 'Based on your income, aim to save at least 20% (₹5,000) each month.',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const aiInsights = [
    `You spent ${insights.categoryComparison.toLowerCase()}`,
    `Your top spending category is ${insights.topCategory} with ${categorySummary[0]?.percentage.toFixed(0)}% of total expenses.`,
    insights.monthlyTrend > 0
      ? `Your spending increased by ${insights.monthlyTrend.toFixed(1)}% compared to last month. Consider reviewing your budget.`
      : `Great job! Your spending decreased by ${Math.abs(insights.monthlyTrend).toFixed(1)}% compared to last month.`,
    insights.budgetPercentage < 20
      ? 'Warning: You have less than 20% of your budget remaining this month.'
      : 'Your budget is on track. Keep up the good work!',
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Smart analysis and personalized recommendations for better financial health
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
            >
              <p className="text-blue-50">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Personalized Recommendations
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {rec.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Budget Allocation Suggestion
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Based on a monthly income of ₹50,000, here's our recommended budget allocation:
        </p>
        <div className="space-y-4">
          {[
            { category: 'Essential Bills', percentage: 30, amount: 15000, color: 'bg-blue-500' },
            { category: 'Food & Groceries', percentage: 25, amount: 12500, color: 'bg-teal-500' },
            { category: 'Savings & Investments', percentage: 20, amount: 10000, color: 'bg-green-500' },
            { category: 'Transportation', percentage: 10, amount: 5000, color: 'bg-purple-500' },
            { category: 'Entertainment', percentage: 10, amount: 5000, color: 'bg-pink-500' },
            { category: 'Miscellaneous', percentage: 5, amount: 2500, color: 'bg-orange-500' },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.category}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ₹{item.amount.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Financial Tips
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Track every expense, no matter how small</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Review your spending weekly to stay on track</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Build an emergency fund covering 3-6 months of expenses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
