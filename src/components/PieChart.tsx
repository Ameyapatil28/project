import { CategorySummary } from '../types';

interface PieChartProps {
  data: CategorySummary[];
}

const COLORS = [
  '#3B82F6',
  '#14B8A6',
  '#8B5CF6',
  '#EC4899',
  '#F59E0B',
  '#10B981',
  '#6366F1',
  '#EF4444',
];

export default function PieChart({ data }: PieChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500">
        No data available
      </div>
    );
  }

  let currentAngle = -90;
  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.total / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;

            const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const endX = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const endY = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);

            const largeArc = angle > 180 ? 1 : 0;

            return (
              <path
                key={item.category}
                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                fill={COLORS[index % COLORS.length]}
                className="transition-all hover:opacity-80"
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="currentColor" className="text-white dark:text-gray-800" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.category}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ₹{item.total.toLocaleString()} • {item.count} transactions
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
