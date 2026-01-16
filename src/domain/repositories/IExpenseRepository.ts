import { Category } from '../entities/Category'
import { Expense } from '../entities/Expense'

export interface IExpenseRepository {
  save(expense: Expense): Promise<void>
  getAll(): Promise<Expense[]>
  delete(id: number): Promise<void>
  update(id: number, expense: Partial<Expense>): Promise<void>
  getCategories(): Promise<Category[]>
  getFixedExpenses(): Promise<Expense[]>
  addFixedExpense(body: Expense): Promise<void>
}