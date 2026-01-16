export interface Expense {
  id: number | undefined;
  category: string;
  description?: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  isFixed: boolean;
  frecuency?: string;
}

export class ExpenseModel implements Expense {
  id: number | undefined;
  category: string;
  description?: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  isFixed: boolean;
  frecuency?: string;

  constructor(
    category: string,
    amount: number,
    description: string = '',
    type: 'expense' | 'income' = 'expense',
    isFixed: boolean = false,
    date: string = new Date().toLocaleDateString('es-CO'),
    frecuency?: string,
  ) {
    this.category = category;
    this.amount = amount;
    this.isFixed = isFixed;
    this.description = description;
    this.type = type;
    this.date = date;
    this.frecuency = frecuency
  }
}
