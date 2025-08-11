import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">CV AI</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:text-blue-600">Inicio</Link>
            <Link to="/generador" className="hover:text-blue-600">Generador</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500">
          Al usar esta herramienta, aceptás los Términos y Condiciones (AR). No almacenamos tus datos; se procesan solo en tu dispositivo salvo el email para envío de PDF tras pago.
        </div>
      </footer>
    </div>
  )
}

export default App
