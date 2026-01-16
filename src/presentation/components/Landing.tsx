import { useState } from 'react'

interface LandingProps {
  isDark: boolean
}

const Landing = ({ isDark }: LandingProps) => {
  
  const mockData = [
    { month: 'Ene', expense: 1200, income: 2500 },
    { month: 'Feb', expense: 1900, income: 2800 },
    { month: 'Mar', expense: 800, income: 2200 },
    { month: 'Abr', expense: 1400, income: 2900 },
    { month: 'May', expense: 1100, income: 2600 },
    { month: 'Jun', expense: 1600, income: 3100 },
  ]

  const getYear = () => {
    const date = new Date()
    return date.getFullYear()
  }

  return (
    <div className={isDark ? 'dark bg-gradient-to-br from-gray-900 via-gray-900/20 to-gray-900 min-h-screen text-gray-100' : 'bg-white min-h-screen text-gray-900'}>
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl border border-white/20">
              <span className="text-sm font-medium text-emerald-400">🚀 Nueva Versión Pro 2026</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-gray-300 via-emerald-400 to-blue-500 bg-clip-text text-transparent leading-tight">
              Controla tus <span className="text-emerald-400">finanzas</span>
              <br />
              con <span className="text-blue-400">inteligencia</span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              La app más completa para rastrear gastos, ingresos y alcanzar tus metas financieras. 
              Diseñada para profesionales como tú.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-3xl font-bold text-emerald-400 mb-2">50K+</div>
                <div className="text-sm text-gray-400">Usuarios activos</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-400">Uptime garantizado</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400">Soporte Premium</div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-center text-lg text-gray-400">
                Únete a miles de profesionales que ya controlan sus finanzas
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl p-6">
                  <div className="text-sm text-emerald-300 mb-2">Gasto Mensual</div>
                  <div className="text-3xl font-bold text-emerald-400">$3,200</div>
                  <div className="text-xs text-emerald-300 mt-1">↓ 12% vs mes anterior</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6">
                  <div className="text-sm text-blue-300 mb-2">Saldo Actual</div>
                  <div className="text-3xl font-bold text-blue-400">$12,450</div>
                  <div className="text-xs text-blue-300 mt-1">↑ 8% este mes</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-sm text-gray-400 block">Resumen Mensual</span>
                    <span className="text-2xl font-bold">+15%</span>
                  </div>
                  <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-medium">
                    Mejorando
                  </span>
                </div>
                
                <div className="space-y-3">
                  {mockData.slice(-4).map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                      <span className="text-sm font-semibold min-w-[40px]">{data.month}</span>
                      <div className="flex-1 mx-4 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-full shadow-lg transition-all duration-700 hover:shadow-emerald-500/50"
                          style={{ width: `${Math.min((data.income - data.expense) / data.income * 100, 90)}%` }}
                        />
                      </div>
                      <span className="font-bold text-emerald-400 text-lg">
                        +${(data.income - data.expense).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-emerald-400/30 to-blue-500/30 rounded-3xl blur-xl animate-pulse" />
            <div className="absolute -bottom-8 left-12 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-2xl blur-xl animate-bounce [animation-delay:1s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl opacity-50 animate-pulse" />
          </div>
        </div>

        <div className="mt-40">
          <h3 className="text-4xl lg:text-5xl font-black text-center mb-20 bg-gradient-to-r from-gray-300 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Todo lo que necesitas para <span className="text-emerald-400">dominar</span> tus finanzas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group p-8 bg-white/5 border-white/10 shadow-xl backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-emerald-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4">Rastreo Automático</h4>
              <p className="text-gray-400 leading-relaxed">Categoriza automáticamente todos tus gastos e ingresos en tiempo real.</p>
            </div>

            <div className="group p-8 bg-white/5 border-white/10 shadow-xl backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-blue-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4">Análisis IA Pro</h4>
              <p className="text-gray-400 leading-relaxed">Predicciones inteligentes que te ayudan a ahorrar más cada mes.</p>
            </div>

            <div className="group p-8 bg-white/5 border-white/10 shadow-xl backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-purple-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4">Reportes Interactivos</h4>
              <p className="text-gray-400 leading-relaxed">Gráficos avanzados y dashboards personalizables en tiempo real.</p>
            </div>

            <div className="group p-8 bg-white/5 border-white/10 shadow-xl backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-pink-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4">Seguridad Militar</h4>
              <p className="text-gray-400 leading-relaxed">Encriptación end-to-end y autenticación avanzada para tus datos.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={`border-t ${isDark ? 'border-white/10': 'border-gray-200 border-b backdrop-blur'} pt-12 pb-8`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            ¿Listo para transformar tus finanzas?
          </p>
          <p className="text-sm text-gray-500 mt-6">
            © {getYear()} Expenses Tracker Pro. Diseñado para profesionales.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing