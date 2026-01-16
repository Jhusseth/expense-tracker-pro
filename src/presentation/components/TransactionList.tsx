import { Expense } from '@/domain/entities/Expense'

interface TransactionListProps {
  title: string,
  expenses: Expense[]
  onDelete: (id: number, isFixed: boolean) => Promise<void>
  onSearch: (query: string) => void
  isDark: boolean
}

export default function TransactionList({
  title,
  expenses,
  onDelete,
  onSearch,
  isDark
}: TransactionListProps) {
  const handleDelete = async (id?: number, isFixed: boolean = false) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
      try {
        if(id){
          await onDelete(id, isFixed)
        }
      } catch (error) {
        alert('Error al eliminar la transacción')
      }
    }
  }

  return (
    <div className={`rounded-xl p-6 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => onSearch(e.target.value)}
          className={`px-3 py-1 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:outline-none focus:border-purple-500`}
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {expenses.length === 0 ? (
          <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            No hay transacciones
          </p>
        ) : (
          expenses.map(e => (
            <div
              key={e.id}
              className={`flex justify-between items-center p-3 rounded-lg transition ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <div className="flex-1">
                <p className="font-medium">{e.description}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {e.category} • {e.date} {e.isFixed && '📌'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p className={`font-bold ${e.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                  {e.type === 'expense' ? '-' : '+'} \${e.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => handleDelete(e.id, e.isFixed)}
                  className={`p-1 rounded transition ${isDark ? 'hover:bg-red-600/50' : 'hover:bg-red-100'} text-red-400`}
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}