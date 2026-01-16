import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from '@presentation/components/Header'
import StatsCard from '@presentation/components/StatsCard'
import ExpenseForm from '@presentation/components/ExpenseForm'
import ExpenseChart from '@presentation/components/Chart'
import TransactionList from '@presentation/components/TransactionList'
import { useExpenses } from '@presentation/hooks/useExpenses'
import { expenseService, persistenceType } from '@domain/config'
import { Expense } from '@/domain/entities/Expense'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function AppContent() {
  const { isAuthenticated, login, logout, expenses, categories, addExpense, deleteExpense} = useExpenses(expenseService, persistenceType)
  const [isDark, setIsDark] = useState(true)
  const [expensesFixed, setExpensesFixed] = useState<Expense[]>(expenses.filter(ex => ex.isFixed))
  const [trxExpenses, setTrxExpenses] = useState<Expense[]>(expenses.filter(ex => !ex.isFixed))

  useEffect(() => {
    setExpensesFixed(expenses.filter(ex => ex.isFixed))
    setTrxExpenses(expenses.filter(ex => !ex.isFixed))
  }, [expenses])

  const handleSearch = (query: string) => {
    if (!query) {
      setTrxExpenses(expenses)
      return
    }
    setTrxExpenses(expenses.filter(e =>
      e.description?.toLowerCase().includes(query.toLowerCase()) ||
      e.category.toLowerCase().includes(query.toLowerCase())
    ))
  }

    const handleSearchFixed = (query: string) => {
    if (!query) {
      setExpensesFixed(expenses)
      return
    }
    setExpensesFixed(expenses.filter(e =>
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

  const parseDate = (dateString: string): Date => {
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/')
      return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
    }
    return new Date(dateString)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const validExpenses = expenses
    .filter(e => {
      return e.type === 'expense' && !e.isFixed
    })

  const todayExpenses = validExpenses
    .filter(e => {
      const expenseDate = parseDate(e.date)
      expenseDate.setHours(0, 0, 0, 0)
      console.log( expenseDate, today)
      return expenseDate.getTime() === today.getTime()
    })
    .reduce((sum, e) => sum + e.amount, 0)
  
  stats.avgDaily = todayExpenses 
  stats.balance = stats.totalIncome - stats.totalExpense

  return (
    <div className={isDark ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}>
      <Header isDark={isDark} setIsDark={setIsDark} isAuthenticated={isAuthenticated} login={login} logout={logout}/>

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
            <ExpenseChart expenses={expenses} isDark={isDark} />
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