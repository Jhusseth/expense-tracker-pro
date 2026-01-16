import { Category } from '@/domain/entities/Category';
import { Expense } from '../../../domain/entities/Expense'
import { IExpenseService } from '../IExpenseService';
import { error } from 'console';

export class GoogleSheetsService implements IExpenseService {
  private accessToken: string  = '';
  private spreadsheetId: string = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;

  private setAccessToken(token: string, spreadsheetId?: string) {
    this.accessToken = token
    if (spreadsheetId) {
      this.spreadsheetId = spreadsheetId
    }
  }

  public initializeWithToken(token: string, spreadsheetId: string) {
    this.setAccessToken(token, spreadsheetId)
  }

  private SHEET_CONFIG = {
    'Gastos': { id: 0, range: 'Gastos!A2:A1000' },
    'Categorias': { id: 1, range: 'Categorias!A2:A100' },
    'Gastos Fijos': { id: 2, range: 'Gastos%20Fijos!A2:A100' },
  } as const

  async getExpenses(): Promise<Expense[]> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Gastos!A2:F1000`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al obtener gastos');

      const data = await response.json();
      
      return (data.values || []).map(
        ([id, category, amount, description, type, date]: string[]) => ({
          id,
          category,
          amount: parseFloat(amount) || 0,
          description: description || '',
          type: type || 'expense',
          isFixed: false,
          date: date || new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error('Error al obtener gastos:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Categorias!A2:D100`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al obtener categorías');

      const data = await response.json();
      return (data.values || []).map(([id, nombre, emoji, tipo]: string[]) => ({
        id: id,
        name: nombre,
        emoji: emoji,
        type: tipo
      }));
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  }

  async getFixedExpenses(): Promise<Expense[]> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Gastos%20Fijos!A2:E100`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al obtener gastos fijos');

      const data = await response.json();
      return (data.values || []).map(
        ([id, category, amount, frecuency, descripcion]: string[]) => ({
          id,
          category,
          amount: parseFloat(amount) || 0,
          frecuency,
          type: 'expense',
          isFixed: true,
          descripcion,
        })
      );
    } catch (error) {
      console.error('Error al obtener gastos fijos:', error);
      throw error;
    }
  }

  async addExpense({
    category,
    amount,
    description,
    type,
    date
  }: Expense):Promise<any> {
    try {
      const id = await this.getNextId('Gastos!A2:A1000')
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Gastos!A:F:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[id, category, amount, description, type, date]],
          }),
        }
      );

      if (!response.ok) throw new Error('Error al agregar gasto');
      return await response.json();
    } catch (error) {
      console.error('Error al guardar gasto:', error);
      throw error;
    }
  }

  async addFixedExpense({
    category,
    amount,
    frecuency,
    description
  }: Expense): Promise<any> {
    try {
      const id = await this.getNextId('Gastos%20Fijos!A2:A100')
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Gastos%20Fijos!A:D:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[id, category, amount, frecuency, description]],
          }),
        }
      );

      if (!response.ok) throw new Error('Error al agregar gasto fijo');
      return await response.json();
    } catch (error) {
      console.error('Error al agregar gasto fijo:', error);
      throw error;
    }
  }

  async updateExpense(id: number, {
    category,
    amount,
    description,
    type, 
    date
  }: Expense): Promise<any> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Gastos!A${id}:F${id}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[category, amount, description, type, date]],
          }),
        }
      );

      if (!response.ok) throw new Error('Error al actualizar gasto');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar gasto:', error);
      throw error;
    }
  }

  async exportToExcel(): Promise<void> {
    try {
      const exportUrl = 
        `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=xlsx`
      window.open(exportUrl, '_blank')
    } catch (error) {
      console.error('Error al descargar Excel:', error)
      throw error
    }
  }

  private async getNextId(sheet: string): Promise<number> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${sheet}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )

      if (!response.ok) return 1

      const data = await response.json()
      const values = data.values || []
      
      const maxId = values.reduce((max: number, [id]: [string]) => {
        const num = parseInt(id, 10) || 0
        return num > max ? num : max
      }, 0)

      return maxId + 1
    } catch (error) {
      console.error('Error al obtener siguiente ID:', error)
      return 1
    }
  }

  private getSheetId(sheetName: string): number {
    const config = this.SHEET_CONFIG[sheetName as keyof typeof this.SHEET_CONFIG]
    if (!config) {
      throw new Error(`Hoja desconocida: ${sheetName}`)
    }
    return config.id
  }

  private getSheetRange(sheetName: string): string {
    const config = this.SHEET_CONFIG[sheetName as keyof typeof this.SHEET_CONFIG]
    if (!config) {
      throw new Error(`Hoja desconocida: ${sheetName}`)
    }
    return config.range
  }

  private async getRowIndexById(id: number, sheetName: string): Promise<number | null> {
    try {
      if (!id || id <= 0) {
        return null
      }

      if (!sheetName?.trim()) {
        return null
      }

      const range = this.getSheetRange(sheetName)

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      const values = data.values || []

      if (!Array.isArray(values) || values.length === 0) {
        return null
      }

      const rowIndex = values.findIndex((row: string[]) => {
        if (!Array.isArray(row) || row.length === 0) {
          return false
        }

        const cellId = row[0]?.trim() ?? ''

        if (!cellId) {
          return false
        }

        const parsedId = parseInt(cellId, 10)

        if (isNaN(parsedId)) {
          return false
        }

        return parsedId === parseInt(id.toString(), 10)
      })

      if (rowIndex === -1) {
        return null
      }

      const actualRow = rowIndex + 1

      return actualRow
    } catch (error) {
      return null
    }
  }

  async deleteExpense(id: number, isFixed: boolean = false): Promise<any> {
    try {
      const sheetName = isFixed ? 'Gastos Fijos' : 'Gastos'

      const rowIndex = await this.getRowIndexById(id, sheetName)

      if (rowIndex === null) {
        throw new Error(`${sheetName} con ID ${id} no encontrado`)
      }

      const sheetId = this.getSheetId(sheetName)

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                deleteDimension: {
                  range: {
                    sheetId: sheetId,
                    dimension: 'ROWS',
                    startIndex: rowIndex,
                    endIndex: rowIndex + 1,
                  },
                },
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Error HTTP ${response.status}: ${error.error?.message}`)
      }

      return await response.json()
    } catch (error) {
      throw error
    }
  }

  async deleteFixedExpense(id: number): Promise<any> {
    return this.deleteExpense(id, true)
  }
  
}