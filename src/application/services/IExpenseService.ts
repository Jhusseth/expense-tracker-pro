import { Expense } from '../../domain/entities/Expense'
import { Category } from '../../domain/entities/Category'

export interface IExpenseService {
  getExpenses(): Promise<Expense[]>
  getCategories(): Promise<Category[]>
  getFixedExpenses(): Promise<Expense[]>
  addExpense(body: Expense): Promise<any>
  addFixedExpense(body: Expense): Promise<any>
  updateExpense(id: number, body: Partial<Expense>): Promise<any>
  deleteExpense(id: number, isFixed: boolean):Promise<any>
  exportToExcel(expenses?: Expense[]): Promise<void>
}