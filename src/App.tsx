import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import InsightsPage from './pages/InsightsPage';
import ExportPage from './pages/ExportPage';
import AboutPage from './pages/AboutPage';
import ExpensesPage from './pages/ExpensesPage';
import AuthPage from './pages/AuthPage';
import { Expense } from './types';
import { fetchExpenses, addExpense, deleteExpense } from './services/expenseService';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const loadExpenses = async () => {
    setLoading(true);
    const data = await fetchExpenses();
    setExpenses(data);
    setLoading(false);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const handleExpensesAdded = async (newExpenses: Omit<Expense, 'id'>[]) => {
    const added: Expense[] = [];
    const errors: string[] = [];
    for (const exp of newExpenses) {
      const { data: saved, error } = await addExpense(exp);
      if (saved) {
        added.push(saved);
      } else if (error) {
        errors.push(error);
      }
    }
    
    if (errors.length > 0) {
      alert("Database error: " + errors[0] + "\n\nPlease check your Supabase schema and RLS policies.");
    }
    
    if (added.length > 0) {
      setExpenses((prev) => [...added, ...prev]);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    const success = await deleteExpense(id);
    if (success) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage expenses={expenses} />;
      case 'upload':
        // The UploadPage might send multiple expenses, which will iterate in handleExpensesAdded
        return <UploadPage onExpensesAdded={handleExpensesAdded as any} />;
      case 'expenses':
        return (
          <ExpensesPage
            expenses={expenses}
            onAddExpense={(expense: Omit<Expense, 'id'>) => handleExpensesAdded([expense])}
            onDeleteExpense={handleDeleteExpense}
          />
        );
      case 'insights':
        return <InsightsPage expenses={expenses} />;
      case 'export':
        return <ExportPage expenses={expenses} />;
      case 'about':
        return <AboutPage />;
      default:
        return <DashboardPage expenses={expenses} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isOpen={isSidebarOpen}
        onChatToggle={() => setIsChatOpen(!isChatOpen)}
      />
      <main className={`pt-16 transition-all ${isChatOpen ? 'lg:pr-96' : ''}`}>
        <div className="lg:ml-64 p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} expenses={expenses} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
