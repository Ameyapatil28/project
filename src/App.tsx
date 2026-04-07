import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import InsightsPage from './pages/InsightsPage';
import ExportPage from './pages/ExportPage';
import AboutPage from './pages/AboutPage';
import ExpensesPage from './pages/ExpensesPage';
import { Expense } from './types';
import { sampleExpenses } from './utils/sampleData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const handleExpensesAdded = (newExpenses: Expense[]) => {
    setExpenses((prev: Expense[]) => [...newExpenses, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev: Expense[]) => prev.filter((exp: Expense) => exp.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage expenses={expenses} />;
      case 'upload':
        return <UploadPage onExpensesAdded={handleExpensesAdded} />;
      case 'expenses':
        return (
          <ExpensesPage
            expenses={expenses}
            onAddExpense={(expense) => handleExpensesAdded([expense])}
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
    <ThemeProvider>
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
        <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
