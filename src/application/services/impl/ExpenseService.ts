import { Expense, ExpenseModel } from '@domain/entities/Expense'
import type { IExpenseRepository } from '@domain/repositories/IExpenseRepository'
import * as XLSX from 'xlsx'
import { IExpenseService } from '../IExpenseService'
import { Category } from '@/domain/entities/Category'

export class ExpenseService implements IExpenseService {
  constructor(private repository: IExpenseRepository) {}

  async addExpense({
    category,
    description,
    amount,
    type,
    isFixed
  }: Expense): Promise<void> {
    const expense = new ExpenseModel(
      category,
      amount,
      description,
      type,
      isFixed
    )
    await this.repository.save(expense)
  }

  async getExpenses(): Promise<Expense[]> {
    return this.repository.getAll()
  }

  async deleteExpense(id: number, isFixed: boolean): Promise<void> {
    await this.repository.delete(id)
  }

  async exportToExcel(expenses: Expense[]): Promise<void> {
    const data = expenses.map(e => ({
      Fecha: e.date,
      Categoría: e.category,
      Descripción: e.description,
      Monto: e.amount,
      Tipo: e.type === 'expense' ? 'Gasto' : 'Ingreso',
      '¿Fijo?': e.isFixed ? 'Sí' : 'No'
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Transacciones')

    const total = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0)
    const income = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0)

    const summary = [
      ['RESUMEN MENSUAL'],
      [''],
      ['Gasto Total', total],
      ['Ingreso Total', income],
      ['Saldo', income - total]
    ]

    const wsSummary = XLSX.utils.aoa_to_sheet(summary)
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen')

    XLSX.writeFile(wb, `Gastos_${new Date().toLocaleDateString('es-CO')}.xlsx`)
  }

  async getCategories(): Promise<Category[]> {
    return this.repository.getCategories()
  }
  
  async getFixedExpenses(): Promise<Expense[]> {
    return this.repository.getFixedExpenses()
  }
  
  async addFixedExpense(body: Expense): Promise<any> {
    await this.repository.addFixedExpense(body)
  }
  
  async updateExpense(id: number, body: Partial<Expense>): Promise<any> {
    await this.repository.update(id, body)
  }
}