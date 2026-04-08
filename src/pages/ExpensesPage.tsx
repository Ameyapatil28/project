import React, { useState, useMemo } from 'react';
import { Expense, ExpenseCategory } from '../types';
import { Plus, Trash2, AlertTriangle, ArrowUpDown, Filter, Frown, Wallet, Calendar, TrendingUp } from 'lucide-react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import { calculateCategorySummary, calculateMonthlySpending } from '../utils/calculations';

interface ExpensesPageProps {
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const CATEGORIES: ExpenseCategory[] = [
  'Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Personal', 'Healthcare', 'Other'
];

export default function ExpensesPage({ expenses, onAddExpense, onDeleteExpense }: ExpensesPageProps) {
  // Form state
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // List filters & sorting state
  const [filterCategory, setFilterCategory] = useState<ExpenseCategory | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Deletion modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !date) return;
    
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date),
      source: 'Manual'
    };

    onAddExpense(newExpense);

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      onDeleteExpense(deletingId);
      setDeletingId(null);
    }
  };

  // Filter and Sort
  const processedExpenses = useMemo(() => {
    let filtered = filterCategory === 'All' 
      ? expenses 
      : expenses.filter(exp => exp.category === filterCategory);

    return filtered.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
  }, [expenses, filterCategory, sortOrder]);

  // Calculations for summary cards and charts
  const categorySummary = useMemo(() => calculateCategorySummary(expenses), [expenses]);
  const monthlySpending = useMemo(() => calculateMonthlySpending(expenses), [expenses]);

  const totalExpenses = useMemo(() => expenses.reduce((sum, exp) => sum + exp.amount, 0), [expenses]);
  
  const thisMonthSpending = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return expenses
      .filter((exp) => exp.date.getMonth() === currentMonth && exp.date.getFullYear() === currentYear)
      .reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const highestCategory = categorySummary[0]?.category || 'None';

  return (
    <div className="space-y-8 animate-fade-in relative">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Expenses</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage all your manual entries and imported expenses.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalExpenses.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month Spending</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{thisMonthSpending.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Highest Category</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {highestCategory}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Category Distribution</h2>
          <PieChart data={categorySummary} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Spending Trend</h2>
          <BarChart data={monthlySpending} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 h-fit lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Add New Expense</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition-colors"
                placeholder="e.g. 500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition-colors"
                placeholder="e.g. Grocery shopping"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition-colors"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 mt-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl hover:opacity-90 transition-opacity font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Expense
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Expenses</h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="bg-transparent text-sm outline-none text-gray-900 dark:text-white"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="bg-transparent text-sm outline-none text-gray-900 dark:text-white"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {processedExpenses.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Frown className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No expenses found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  {expenses.length === 0 
                    ? "It looks like you haven't added any expenses yet." 
                    : "No expenses match your current filter."}
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {processedExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        {expense.category.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-lg">
                          {expense.description}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(expense.date).toLocaleDateString()} • {expense.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pl-16 sm:pl-0">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹{expense.amount.toLocaleString()}
                      </p>
                      <button
                        onClick={() => setDeletingId(expense.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                        title="Delete expense"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Delete Expense
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
