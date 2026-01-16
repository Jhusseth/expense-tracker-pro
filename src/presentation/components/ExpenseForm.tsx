import { Category } from '@/domain/entities/Category'
import { useState } from 'react'

interface ExpenseFormProps {
  onAddExpense: (category: string, description: string, amount: number, type: 'expense' | 'income', isFixed: boolean) => Promise<void>
  isDark: boolean
  categories: Category[]
}

export default function ExpenseForm({ onAddExpense, isDark, categories }: ExpenseFormProps) {
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [isFixed, setIsFixed] = useState(false)
  const [loading, setLoading] = useState(false)
  const filteredCategories = categories.filter(category => category.type === type)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !description || !amount) {
      alert('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    try {
      await onAddExpense(category, description, parseFloat(amount), type, isFixed)
      setCategory('')
      setDescription('')
      setAmount('')
      setIsFixed(false)
    } catch (error) {
      alert('Error al agregar gasto')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={`p-6 border shadow-xl bg-white/5 backdrop-blur-s rounded-3xl ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h2 className="text-xl font-bold mb-6">Registrar Gasto</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}
          >
            <option value="">Seleccionar categoría...</option>
            {filteredCategories.map(cat => (
              <option key={cat.name} value={cat.name}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Almuerzo en restaurante"
            className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Monto ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tipo</label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${type === 'expense' ? 'bg-red-600 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
            >
              💸 Gasto
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${type === 'income' ? 'bg-green-600 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
            >
              💵 Ingreso
            </button>
          </div>
        </div>
        { type === 'expense' 
          ? (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFixed"
                checked={isFixed}
                onChange={(e) => setIsFixed(e.target.checked)}
                className="w-4 h-4 cursor-pointer rounded"
              />
              <label htmlFor="isFixed" className="text-sm cursor-pointer">
                ¿Es un gasto fijo? (recurrente)
              </label>
            </div>)
          : <></>
        }

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold transition bg-gradient-to-r from-purple-600 to-pink-600 text-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:opacity-90'}`}
        >
          {loading ? 'Agregando...' : '➕ Agregar Transacción'}
        </button>
      </div>
    </form>
  )
}