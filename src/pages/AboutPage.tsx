import { Upload, Brain, BarChart3, Shield, Zap, Users } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Upload CSV, PDF statements or paste SMS text for instant processing',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'AI Classification',
      description: 'Advanced AI automatically categorizes expenses with high accuracy',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'Interactive charts and graphs for better spending insights',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Zap,
      title: 'Real-time Insights',
      description: 'Get instant budget alerts and spending recommendations',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'AI Assistant',
      description: 'Chat with AI to query your expenses and get personalized advice',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How ExpenseAI Works
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Automate your expense tracking with AI-powered classification and get actionable insights to save smarter
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Simple 3-Step Process</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-4xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-semibold">Upload Your Data</h3>
            <p className="text-blue-100">
              Upload UPI statements, bank statements (CSV/PDF), or simply paste SMS transaction messages
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-4xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-semibold">AI Classifies Automatically</h3>
            <p className="text-blue-100">
              Our intelligent AI analyzes and categorizes each transaction into Food, Travel, Bills, Shopping, and more
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-4xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-semibold">Get Visual Insights</h3>
            <p className="text-blue-100">
              View interactive charts, track spending patterns, receive budget alerts, and export detailed reports
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Why Choose ExpenseAI?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Save Time
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No more manual entry. AI does the heavy lifting in seconds.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Better Awareness
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Visualize spending patterns and identify where your money goes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Smart Recommendations
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Receive personalized budget tips based on your spending habits.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Budget Control
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Set limits and get alerts when you're close to exceeding them.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Export Anywhere
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Download your data in CSV format for tax filing or analysis.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Always Available
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Access your financial dashboard anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Automate your expense tracking with AI. Get insights. Set budgets. Save smarter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl transition-shadow">
            Upload Your First Statement
          </button>
          <button className="px-8 py-4 bg-purple-600/30 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-semibold text-lg hover:bg-purple-600/50 transition-colors">
            View Demo Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
