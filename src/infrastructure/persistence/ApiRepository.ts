import { Category } from '@/domain/entities/Category'
import type { Expense } from '../../domain/entities/Expense'
import type { IExpenseRepository } from '../../domain/repositories/IExpenseRepository'

// Esta clase está lista para ser implementada cuando migres a una API
// Documentación de migración: ver README.md

export class ApiRepository implements IExpenseRepository {
  // TODO: Implementar cuando tengas el backend listo
  // constructor(private client: AxiosInstance) {}

  async save(expense: Expense): Promise<void> {
    // await this.client.post('/expenses', expense)
    throw new Error('ApiRepository no está implementado aún. Ver README.md para migración.')
  }

  async getAll(): Promise<Expense[]> {
    // await this.client.get('/expenses')
    throw new Error('ApiRepository no está implementado aún. Ver README.md para migración.')
  }

  async delete(id: number): Promise<void> {
    // await this.client.delete(`/expenses/${id}`)
    throw new Error('ApiRepository no está implementado aún. Ver README.md para migración.')
  }

  async update(id: number, body: Partial<Expense>): Promise<void> {
    // await this.client.patch(`/expenses/${id}`, body)
    throw new Error('ApiRepository no está implementado aún. Ver README.md para migración.')
  }

  async getCategories(): Promise<Category[]> {
    // await this.client.get(`/categories`)
    throw new Error('ApiRepository no está implementado aún. Ver README.md para migración.')
  }
  
  async getFixedExpenses(): Promise<Expense[]> {
    // await this.client.get(`/fixed/expenses`)
    throw new Error('ApiRepository no está implementado aún. Ver README.md para migración.')
  }
  
  async addFixedExpense(body: Expense): Promise<void> {
    // await this.client.post(`/fixed/expenses`, body)
    throw new Error('ApiRepository no está implementado aún. Ver README.md para migración.')
  }
}