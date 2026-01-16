import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from '@presentation/components/Header'
import StatsCard from '@presentation/components/StatsCard'
import ExpenseForm from '@presentation/components/ExpenseForm'
import ExpenseChart from '@presentation/components/Chart'
import TransactionList from '@presentation/components/TransactionList'
import Landing from './presentation/components/Landing'
import { useExpenses } from '@presentation/hooks/useExpenses'
import { expenseService, persistenceType } from '@domain/config'
import { Expense } from '@/domain/entities/Expense'
import { parseDate } from './utils/Dates'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function AppContent() {
  const { isAuthenticated, login, logout, expenses, categories, addExpense, deleteExpense, exportToExcel} = useExpenses(expenseService, persistenceType)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('expenses-tracker-dark-mode')
      if (saved !== null) {
        return JSON.parse(saved)
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true
  })
  const [expensesFixed, setExpensesFixed] = useState<Expense[]>(expenses.filter(ex => ex.isFixed))
  const [trxExpenses, setTrxExpenses] = useState<Expense[]>(expenses.filter(ex => !ex.isFixed))

  useEffect(() => {
    setExpensesFixed(expenses.filter(ex => ex.isFixed))
    setTrxExpenses(expenses.filter(ex => !ex.isFixed))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem('expenses-tracker-dark-mode', JSON.stringify(isDark))
  }, [isDark])

  const handleSearch = (query: string) => {
    if (!query) {
      setTrxExpenses(expenses.filter(ex => !ex.isFixed))
      return
    }
    setTrxExpenses(expenses.filter(e =>
      !e.isFixed &&
      e.description?.toLowerCase().includes(query.toLowerCase()) ||
      e.category.toLowerCase().includes(query.toLowerCase())
    ))
  }

  const handleSearchFixed = (query: string) => {
    if (!query) {
      setExpensesFixed(expenses.filter(ex => ex.isFixed))
      return
    }
    setExpensesFixed(expenses.filter(e =>
      e.isFixed &&
      e.description?.toLowerCase().includes(query.toLowerCase()) ||
      e.category.toLowerCase().includes(query.toLowerCase())
    ))
  }

  const stats = {
    totalExpense: expenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0),
    totalIncome: expenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0),
    balance: 0,
    avgDaily: 0,
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const validExpenses = expenses.filter(e => e.type === 'expense' && !e.isFixed)

  const todayExpenses = validExpenses
  .filter(e => {
    const expenseDate = parseDate(e.date)
    expenseDate.setHours(0, 0, 0, 0)
    const match = expenseDate.getTime() === today.getTime()
    return match
  })
  .reduce((sum, e) => sum + e.amount, 0)
  
  stats.avgDaily = todayExpenses 
  stats.balance = stats.totalIncome - stats.totalExpense

  return (
    <div className={isDark ? 'dark bg-gradient-to-br from-gray-900 via-gray-900/20 to-gray-900 min-h-screen text-gray-100' : 'bg-white min-h-screen text-gray-900'}>
      <Header isDark={isDark} setIsDark={setIsDark} isAuthenticated={isAuthenticated} login={login} logout={logout}/>
      { isAuthenticated 
        ? 
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatsCard label="Gasto Mes" value={stats.totalExpense} type="expense" isDark={isDark} />
              <StatsCard label="Ingresos" value={stats.totalIncome} type="income" isDark={isDark} />
              <StatsCard label="Saldo" value={stats.balance} type="balance" isDark={isDark} />
              <StatsCard label="Promedio Diario" value={stats.avgDaily} type="daily" isDark={isDark} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ExpenseForm onAddExpense={addExpense} isDark={isDark} categories={categories} />
              <div className="lg:col-span-2 space-y-6">
                <ExpenseChart expenses={trxExpenses} isDark={isDark} />
                <TransactionList
                  title = 'Gastos Fijos'
                  expenses={expensesFixed}
                  onDelete={deleteExpense}
                  onSearch={handleSearchFixed}
                  isDark={isDark}
                />
              </div>
            </div>
            <div className='mt-5'>
              <TransactionList
                  title = 'Historial de Transacciones'
                  expenses={trxExpenses}
                  onDelete={deleteExpense}
                  onSearch={handleSearch}
                  isDark={isDark}
                />
            </div>
          </main>
        : <Landing isDark={isDark}/>}
      {isAuthenticated && (
        <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6 z-50 group">
          <button
            onClick={exportToExcel}
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-600 hover:from-emerald-600 hover:to-blue-700 shadow-2xl hover:shadow-3xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 backdrop-blur-sm border-4 border-white hover:border-white active:border-white"
            title="Descargar Reporte PDF/Excel"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 2-2m-7 4h12" />
            </svg>
          </button>
          <div className="absolute -top-10 sm:-top-12 right-0 bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-md text-white px-3 py-2 rounded-xl text-xs shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none border border-gray-700/50">
            📊 Descargar Reporte
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppContent />
    </GoogleOAuthProvider>
  )
}