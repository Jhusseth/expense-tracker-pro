interface HeaderProps {
  isDark: boolean
  setIsDark: (dark: boolean) => void
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export default function Header({ 
  isDark, 
  setIsDark, 
  isAuthenticated, 
  login, 
  logout 
}: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b backdrop-blur`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Expense Tracker Pro</h1>
            <p className="text-xs opacity-60">Gestión de gastos inteligente</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setIsDark(!isDark)
              localStorage.setItem('theme', isDark ? 'light' : 'dark')
            }}
            className={`p-3 rounded-lg transition ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          {!isAuthenticated ? (
            <button
              onClick={() => login()}
              className={`p-3 rounded-lg transition flex items-center gap-2 ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              title="Conectar con Google Sheets"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-500/20 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Conectado</span>
              </div>
              <button
                onClick={() => logout()}
                className={`p-3 rounded-lg transition ${
                  isDark 
                    ? 'bg-red-600/20 hover:bg-red-600/30 text-red-500' 
                    : 'bg-red-100 hover:bg-red-200 text-red-600'
                }`}
                title="Desconectar de Google"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}