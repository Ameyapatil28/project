import { Expense, ExpenseCategory } from '../types';

export const sampleExpenses: Expense[] = [
  {
    id: '1',
    amount: 450,
    category: 'Food',
    description: 'Swiggy - Pizza Hut',
    date: new Date('2025-10-01'),
    source: 'UPI',
    merchantName: 'Swiggy',
  },
  {
    id: '2',
    amount: 1200,
    category: 'Shopping',
    description: 'Amazon - Electronics',
    date: new Date('2025-10-02'),
    source: 'UPI',
    merchantName: 'Amazon',
  },
  {
    id: '3',
    amount: 85,
    category: 'Travel',
    description: 'Uber - Home to Office',
    date: new Date('2025-10-02'),
    source: 'UPI',
    merchantName: 'Uber',
  },
  {
    id: '4',
    amount: 2500,
    category: 'Bills',
    description: 'Electricity Bill Payment',
    date: new Date('2025-10-03'),
    source: 'Bank',
    merchantName: 'State Electricity Board',
  },
  {
    id: '5',
    amount: 350,
    category: 'Food',
    description: 'Zomato - Dominos',
    date: new Date('2025-10-03'),
    source: 'UPI',
    merchantName: 'Zomato',
  },
  {
    id: '6',
    amount: 150,
    category: 'Travel',
    description: 'Metro Card Recharge',
    date: new Date('2025-10-04'),
    source: 'UPI',
    merchantName: 'Delhi Metro',
  },
  {
    id: '7',
    amount: 890,
    category: 'Entertainment',
    description: 'BookMyShow - Movie Tickets',
    date: new Date('2025-10-04'),
    source: 'UPI',
    merchantName: 'BookMyShow',
  },
  {
    id: '8',
    amount: 3200,
    category: 'Shopping',
    description: 'Myntra - Clothing',
    date: new Date('2025-10-05'),
    source: 'UPI',
    merchantName: 'Myntra',
  },
  {
    id: '9',
    amount: 280,
    category: 'Food',
    description: 'Starbucks Coffee',
    date: new Date('2025-10-05'),
    source: 'UPI',
    merchantName: 'Starbucks',
  },
  {
    id: '10',
    amount: 1800,
    category: 'Bills',
    description: 'Internet Bill - Airtel',
    date: new Date('2025-10-06'),
    source: 'Bank',
    merchantName: 'Airtel',
  },
  {
    id: '11',
    amount: 550,
    category: 'Healthcare',
    description: 'Apollo Pharmacy',
    date: new Date('2025-10-06'),
    source: 'UPI',
    merchantName: 'Apollo Pharmacy',
  },
  {
    id: '12',
    amount: 420,
    category: 'Food',
    description: 'Swiggy - Burger King',
    date: new Date('2025-10-07'),
    source: 'UPI',
    merchantName: 'Swiggy',
  },
  {
    id: '13',
    amount: 250,
    category: 'Personal',
    description: 'Salon - Haircut',
    date: new Date('2025-10-07'),
    source: 'UPI',
    merchantName: 'Lakme Salon',
  },
  {
    id: '14',
    amount: 180,
    category: 'Travel',
    description: 'Ola - Office to Home',
    date: new Date('2025-10-08'),
    source: 'UPI',
    merchantName: 'Ola',
  },
  {
    id: '15',
    amount: 1500,
    category: 'Shopping',
    description: 'Big Bazaar - Groceries',
    date: new Date('2025-10-08'),
    source: 'UPI',
    merchantName: 'Big Bazaar',
  },
];

export function classifyExpense(description: string): ExpenseCategory {
  const desc = description.toLowerCase();

  if (desc.includes('swiggy') || desc.includes('zomato') || desc.includes('food') ||
      desc.includes('restaurant') || desc.includes('pizza') || desc.includes('burger') ||
      desc.includes('starbucks') || desc.includes('cafe') || desc.includes('dominos')) {
    return 'Food';
  }

  if (desc.includes('uber') || desc.includes('ola') || desc.includes('metro') ||
      desc.includes('bus') || desc.includes('train') || desc.includes('flight') ||
      desc.includes('petrol') || desc.includes('fuel')) {
    return 'Travel';
  }

  if (desc.includes('amazon') || desc.includes('flipkart') || desc.includes('myntra') ||
      desc.includes('shopping') || desc.includes('mall') || desc.includes('store') ||
      desc.includes('clothing') || desc.includes('electronics')) {
    return 'Shopping';
  }

  if (desc.includes('electricity') || desc.includes('water') || desc.includes('internet') ||
      desc.includes('mobile') || desc.includes('bill') || desc.includes('recharge') ||
      desc.includes('airtel') || desc.includes('jio')) {
    return 'Bills';
  }

  if (desc.includes('movie') || desc.includes('bookmyshow') || desc.includes('netflix') ||
      desc.includes('spotify') || desc.includes('entertainment') || desc.includes('game')) {
    return 'Entertainment';
  }

  if (desc.includes('pharmacy') || desc.includes('hospital') || desc.includes('doctor') ||
      desc.includes('medicine') || desc.includes('health') || desc.includes('apollo')) {
    return 'Healthcare';
  }

  if (desc.includes('salon') || desc.includes('spa') || desc.includes('gym') ||
      desc.includes('fitness') || desc.includes('personal')) {
    return 'Personal';
  }

  return 'Other';
}

export function extractExpenseFromSMS(smsText: string): Partial<Expense> | null {
  const amountMatch = smsText.match(/(?:Rs\.?|INR|₹)\s*(\d+(?:,\d+)*(?:\.\d{2})?)/i);
  const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : null;

  if (!amount) return null;

  const merchantMatch = smsText.match(/(?:at|to|from)\s+([A-Za-z\s]+?)(?:\s+on|\s+via|\s+using|\.)/i);
  const merchantName = merchantMatch ? merchantMatch[1].trim() : 'Unknown';

  const category = classifyExpense(smsText);

  return {
    amount,
    category,
    description: smsText.substring(0, 100),
    merchantName,
    source: 'SMS',
    date: new Date(),
  };
}
