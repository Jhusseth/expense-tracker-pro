import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Expense } from '@/domain/entities/Expense'
import { parseDate } from '@/utils/Dates'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ChartProps {
  expenses: Expense[]
  isDark: boolean
}

export default function ExpenseChart({ expenses, isDark }: ChartProps) {
  
  const chartData = useMemo(() => {
    const breakdown: Record<string, number> = {}
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    expenses
      .filter(e => {
        const date = parseDate(e.date)
        return e.type === 'expense' && date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      .forEach(e => {
        breakdown[e.category] = (breakdown[e.category] || 0) + e.amount
      })

    return {
      labels: Object.keys(breakdown),
      datasets: [{
        data: Object.values(breakdown),
        backgroundColor: [
          '#EF4444', '#F97316', '#EAB308', '#22C55E',
          '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'
        ],
        borderColor: isDark ? '#1F2937' : '#F3F4F6',
        borderWidth: 2
      }]
    }
  }, [expenses, isDark])

  return (
    <div className={`shadow-xl bg-white/5 backdrop-blur-s rounded-3xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h2 className="text-xl font-bold mb-4">Gastos por Categoría (Este Mes)</h2>
      <div style={{ position: 'relative', height: '300px' }}>
        {Object.keys(chartData.labels).length > 0 ? (
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: isDark ? '#D1D5DB' : '#374151',
                    font: { size: 13 },
                    padding: 15
                  }
                }
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Sin gastos aún</p>
          </div>
        )}
      </div>
    </div>
  )
}