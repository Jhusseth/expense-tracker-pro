import { useState, useEffect, useCallback } from 'react'
import type { Expense } from '@/domain/entities/Expense'
import type { IExpenseService } from '@/application/services/IExpenseService'
import { PersistenceType } from '@/domain/types'
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleSheetsService } from '@/application/services/impl/GoogleSheetsService'

export function useExpenses(expenseService: IExpenseService, persistenceType: PersistenceType) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token')
    if (savedToken) {
      setAccessToken(savedToken)
    }
  }, [isAuthenticated])

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem('access_token', codeResponse.access_token)
      setAccessToken(codeResponse.access_token)
    },
    scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive',
    flow: 'implicit',
  })

  const setAccessToken = (acessToken: string) => {
    if (expenseService instanceof GoogleSheetsService ||
      'initializeWithToken' in expenseService) {
      ; (expenseService as GoogleSheetsService).initializeWithToken(
        acessToken,
        import.meta.env.VITE_GOOGLE_SPREADSHEET_ID
      )
    }
    setIsAuthenticated(true)
    loadCategories()
    loadExpenses()
  }

  const login = useCallback(async () => {
    switch (persistenceType) {
      case 'google-sheets':
        googleLogin()
        break
      case 'api':
        break
      default:
        break
    }
  },[persistenceType, googleLogin])

  const loadExpenses = useCallback(async () => {
    setLoading(true)
    try {
      const expenses = await expenseService.getExpenses()
      const fixedExpenses = await expenseService.getFixedExpenses()
      const allExpenses = [...expenses, ...fixedExpenses]
      setExpenses(allExpenses)
    } catch (error) {
      console.error('Error cargando gastos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadCategories = useCallback(async () => {
    setLoading(true)
    try {
      const data = await expenseService.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error cargando categorías:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const addExpense = useCallback(async (
    category: string,
    description: string,
    amount: number,
    type: 'expense' | 'income',
    isFixed: boolean,
    date: string = new Date().toLocaleDateString('es-CO') 
  ) => {
    try {
      const id = undefined
      if(isFixed){
        const frecuency = 'Monthly'
        await expenseService.addFixedExpense({ id, category, description, amount, type, isFixed, frecuency, date})
      } else {
        await expenseService.addExpense({ id, category, description, amount, type, isFixed, date})
      }
      await loadExpenses()
    } catch (error) {
      console.error('Error adding expense:', error)
      throw error
    }
  }, [])

  const deleteExpense = useCallback(async (id: number, isFixed: boolean) => {
    try {
      await expenseService.deleteExpense(id, isFixed)
      await loadExpenses()
    } catch (error) {
      console.error('Error deleting expense:', error)
      throw error
    }
  }, [loadExpenses])

  const exportToExcel = useCallback(async () => {
    try {
      await expenseService.exportToExcel(expenses)
      await loadExpenses()
    } catch (error) {
      console.error('Error exporting to excel:', error)
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    setIsAuthenticated(false)
    setExpenses([])
    setCategories([])
  }, [])

  return {
    isAuthenticated,
    expenses,
    categories,
    loading,
    login,
    loadExpenses,
    loadCategories,
    addExpense,
    deleteExpense,
    exportToExcel,
    logout,
  }
}