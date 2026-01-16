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
    <header className={`sticky top-0 z-50 ${isDark ? 'dark bg-gradient-to-br from-gray-800 via-gray-900/20 to-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-900'} border-b backdrop-blur`}>
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-3 p-2 -m-2 sm:p-0 sm:-m-0">
          <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-600 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black leading-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Expenses Tracker
            </h1>
            <span className="text-sm sm:text-base md:text-lg font-bold text-emerald-400/90 sm:text-transparent sm:bg-gradient-to-r sm:from-emerald-400 sm:to-teal-400 sm:bg-clip-text">
              Pro
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
            title="Cambiar tema"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
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