import { Category } from '@/domain/entities/Category'
import { Expense } from '../../domain/entities/Expense'
import type { IExpenseRepository } from '../../domain/repositories/IExpenseRepository'

export class LocalStorageRepository implements IExpenseRepository {
  private readonly EXPENSES_KEY = 'expenses_data'
  private readonly CATEGORY_KEY = 'categories_data'

  async save(expense: Expense): Promise<void> {
    const expenses = await this.getAll()
    expenses.unshift(expense)
    localStorage.setItem(this.EXPENSES_KEY, JSON.stringify(expenses))
  }

  async getAll(): Promise<Expense[]> {
    try {
      const data = localStorage.getItem(this.EXPENSES_KEY)
      if (!data) return []
      return JSON.parse(data).map((e: any) => ({
        ...e,
        timestamp: new Date(e.timestamp)
      }))
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return []
    }
  }

  async delete(id: number): Promise<void> {
    const expenses = await this.getAll()
    const filtered = expenses.filter(e => e.id !== id)
    localStorage.setItem(this.EXPENSES_KEY, JSON.stringify(filtered))
  }

  async update(id: number, updates: Partial<Expense>): Promise<void> {
    const expenses = await this.getAll()
    const index = expenses.findIndex(e => e.id === id)
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updates }
      localStorage.setItem(this.EXPENSES_KEY, JSON.stringify(expenses))
    }
  }

  async getCategories(): Promise<Category[]> {
    const categories = [
      { name: 'Alimentación', emoji: '🍔' },
      { name: 'Transporte', emoji: '🚗' },
      { name: 'Entretenimiento', emoji: '🎮' },
      { name: 'Salud', emoji: '⚕️' },
      { name: 'Educación', emoji: '📚' },
      { name: 'Vivienda', emoji: '🏠' },
      { name: 'Servicios', emoji: '💡' },
      { name: 'Otro', emoji: '📌' },
    ]
    localStorage.setItem(this.CATEGORY_KEY, JSON.stringify(categories));
    try {
      const data = localStorage.getItem(this.CATEGORY_KEY)
      if (!data) return []
      return JSON.parse(data).map((e: any) => ({
        ...e,
        timestamp: new Date(e.timestamp)
      }))
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return []
    }
  }
  
  async getFixedExpenses(): Promise<Expense[]> {
    const expenses = await this.getAll()
    return expenses.filter(e => e.isFixed)
  }
  async addFixedExpense(body: Expense): Promise<void> {
    body.isFixed = true;
    this.save(body)
  }
}