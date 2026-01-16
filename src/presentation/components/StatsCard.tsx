interface StatsCardProps {
  label: string
  value: number
  type: 'expense' | 'income' | 'balance' | 'daily'
  isDark?: boolean
}

export default function StatsCard({ label, value, type, isDark = true }: StatsCardProps) {
  const getColor = () => {
    switch (type) {
      case 'expense': return isDark ? 'text-red-400' : 'text-red-600'
      case 'income': return isDark ? 'text-green-400' : 'text-green-600'
      case 'balance': return isDark ? 'text-blue-400' : 'text-blue-600'
      case 'daily': return isDark ? 'text-yellow-400' : 'text-yellow-600'
      default: return ''
    }
  }

  return (
    <div className={`rounded-2xl border border-white/10 p-6 border transition hover:scale-105 shadow-xl ${isDark ? 'bg-white/5 backdrop-blur-sm hover:border-gray-600' : 'bg-gray-50 backdrop-blur-sm hover:border-gray-300'}`}>
      <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
      <p className={`text-3xl font-bold mt-2 ${getColor()}`}>${value.toFixed(2)}</p>
    </div>
  )
}