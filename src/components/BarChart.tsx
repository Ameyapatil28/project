import { MonthlySpending } from '../types';

interface BarChartProps {
  data: MonthlySpending[];
}

export default function BarChart({ data }: BarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500">
        No data available
      </div>
    );
  }

  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 h-64">
        {data.map((item, index) => {
          const height = (item.amount / maxAmount) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  ₹{(item.amount / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-teal-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Monthly</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{(data.reduce((sum, d) => sum + d.amount, 0) / data.length).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Highest Month</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{Math.max(...data.map((d) => d.amount)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
