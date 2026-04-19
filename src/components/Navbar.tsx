import { Moon, Sun, Menu, X, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-md shadow-blue-500/20">
                <span className="text-white font-bold text-xl">$</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">
                  ExpenseAI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Smart Finance Tracker</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            {user && (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
