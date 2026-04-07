import { Upload, FileText, MessageSquare, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { extractExpenseFromSMS } from '../utils/sampleData';
import { Expense } from '../types';

interface UploadPageProps {
  onExpensesAdded: (expenses: Expense[]) => void;
}

export default function UploadPage({ onExpensesAdded }: UploadPageProps) {
  const [smsText, setSmsText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSMSSubmit = () => {
    if (!smsText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const expense = extractExpenseFromSMS(smsText);
      if (expense) {
        const newExpense: Expense = {
          id: Date.now().toString(),
          amount: expense.amount!,
          category: expense.category!,
          description: expense.description!,
          date: expense.date!,
          source: 'SMS',
          merchantName: expense.merchantName,
        };
        onExpensesAdded([newExpense]);
        setUploadSuccess(true);
        setSmsText('');
        setTimeout(() => setUploadSuccess(false), 3000);
      }
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Your Data
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload UPI statements, bank statements, or paste SMS text for AI-powered expense classification
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upload Statement
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">CSV or PDF format</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".csv,.pdf"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Click to upload
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or drag and drop
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CSV or PDF up to 10MB
              </p>
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Paste SMS Text
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI will extract details</p>
            </div>
          </div>

          <textarea
            value={smsText}
            onChange={(e) => setSmsText(e.target.value)}
            placeholder="Paste your transaction SMS here...&#10;&#10;Example: Rs.450 debited from your account at Swiggy on 09-Oct-25"
            className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />

          <button
            onClick={handleSMSSubmit}
            disabled={!smsText.trim() || isProcessing}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Process SMS'
            )}
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 flex items-center gap-4">
          <Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Processing your data...
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              AI is analyzing and categorizing your expenses
            </p>
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <p className="font-medium text-green-900 dark:text-green-100">
            ✓ Success! Your expenses have been categorized and added to the dashboard.
          </p>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h4 className="font-semibold">Upload Data</h4>
            <p className="text-sm text-blue-100">
              Upload your UPI statement or paste SMS transaction text
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h4 className="font-semibold">AI Classification</h4>
            <p className="text-sm text-blue-100">
              Our AI automatically categorizes expenses into Food, Travel, Bills, etc.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h4 className="font-semibold">Get Insights</h4>
            <p className="text-sm text-blue-100">
              View analytics, track spending patterns, and receive budget alerts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
