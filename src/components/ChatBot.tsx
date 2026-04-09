import { X, Send } from 'lucide-react';
import { useState } from 'react';
import { Expense } from '../types';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatBot({ isOpen, onClose, expenses }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI financial assistant. Ask me anything about your expenses!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Evaluate Data Dynamically
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentExpenses = expenses.filter(exp => exp.date.getMonth() === currentMonth && exp.date.getFullYear() === currentYear);
    const totalSpent = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (q.includes('food') || q.includes('eat') || q.includes('dining')) {
      const foodSpent = currentExpenses.filter(e => e.category === 'Food').reduce((sum, exp) => sum + exp.amount, 0);
      const percent = totalSpent > 0 ? ((foodSpent / totalSpent) * 100).toFixed(0) : 0;
      return `Based on your transactions, you've spent ₹${foodSpent.toLocaleString()} on food this month. That's ${percent}% of your total expenses. ${foodSpent > 5000 ? "Consider meal prepping to save more!" : "You're doing great keeping food costs down!"}`;
    }
    if (q.includes('travel') || q.includes('transport')) {
      const travelSpent = currentExpenses.filter(e => e.category === 'Travel').reduce((sum, exp) => sum + exp.amount, 0);
      return `Your travel expenses are ₹${travelSpent.toLocaleString()} this month. Have you considered a monthly pass to optimize your commute?`;
    }
    if (q.includes('summary') || q.includes('total') || q.includes('how much did i spend')) {
      return `You have spent a total of ₹${totalSpent.toLocaleString()} this month.`;
    }
    if (q.includes('save') || q.includes('saving') || q.includes('savings')) {
      const savePotential = (totalSpent * 0.15).toFixed(0);
      return `Great question! Based on your recent spending patterns, you could potentially save around ₹${Number(savePotential).toLocaleString()} more per month by reducing non-essential expenses by just 15%.`;
    }
    if (q.includes('budget')) {
      return `Based on your current spending of ₹${totalSpent.toLocaleString()}, I recommend keeping an eye on your top categories. Try the 50/30/20 rule: 50% Needs, 30% Wants, 20% Savings!`;
    }
    if (q.includes('highest') || q.includes('top') || q.includes('most')) {
      if (currentExpenses.length === 0) return "You don't have any expenses recorded for this month yet.";
      
      const categoryTotals = currentExpenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {} as Record<string, number>);
      
      let topCategory = '';
      let topAmount = 0;
      for (const [cat, amt] of Object.entries(categoryTotals)) {
        if (amt > topAmount) {
          topAmount = amt;
          topCategory = cat;
        }
      }
      return `Your highest spending category this month is ${topCategory} with ₹${topAmount.toLocaleString()} spent.`;
    }
    
    return "I can help you analyze your real-time spending patterns, track expenses by category, find your top expenditures, and provide budget recommendations. Try asking 'What is my total this month?' or 'How much did I spend on food?'";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your expenses..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-lg transition-shadow"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
