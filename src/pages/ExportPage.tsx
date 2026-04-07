import { Download, FileText, Table } from 'lucide-react';
import { Expense } from '../types';
import { calculateCategorySummary } from '../utils/calculations';

interface ExportPageProps {
  expenses: Expense[];
}

export default function ExportPage({ expenses }: ExportPageProps) {
  const categorySummary = calculateCategorySummary(expenses);

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount', 'Source', 'Merchant'];
    const rows = expenses.map((exp) => [
      exp.date.toLocaleDateString(),
      exp.category,
      exp.description,
      exp.amount.toString(),
      exp.source,
      exp.merchantName || '',
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCategorySummary = () => {
    const headers = ['Category', 'Total Amount', 'Percentage', 'Transaction Count'];
    const rows = categorySummary.map((cat) => [
      cat.category,
      cat.total.toString(),
      cat.percentage.toFixed(2) + '%',
      cat.count.toString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `category_summary_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Export Data
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Download your expense data in various formats for further analysis
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Full Transaction Data
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All expenses with details
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Records:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {expenses.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Format:</span>
              <span className="font-semibold text-gray-900 dark:text-white">CSV</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Includes:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                All fields
              </span>
            </div>
          </div>

          <button
            onClick={exportToCSV}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download CSV
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Table className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Category Summary
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aggregated by category
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Categories:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {categorySummary.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Format:</span>
              <span className="font-semibold text-gray-900 dark:text-white">CSV</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Includes:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                Totals & %
              </span>
            </div>
          </div>

          <button
            onClick={exportCategorySummary}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Data Preview
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 10).map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {expense.date.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {expense.description}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-right text-gray-900 dark:text-white">
                    ₹{expense.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {expenses.length > 10 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Showing 10 of {expenses.length} transactions
          </p>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Export Tips</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">💾 Use Exported Data For:</h4>
            <ul className="space-y-1 text-blue-50 text-sm">
              <li>• Tax filing and documentation</li>
              <li>• Personal accounting software</li>
              <li>• Budget analysis in Excel</li>
              <li>• Long-term financial planning</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">📊 CSV Format Benefits:</h4>
            <ul className="space-y-1 text-blue-50 text-sm">
              <li>• Compatible with Excel, Google Sheets</li>
              <li>• Easy to import into other tools</li>
              <li>• Lightweight and shareable</li>
              <li>• Universal file format</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
