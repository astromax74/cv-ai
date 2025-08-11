import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Creá un CV optimizado con IA para tu próxima postulación
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generá un perfil profesional, adapta tu experiencia y habilidades a un aviso específico y descargá tu PDF profesional.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/generador" className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Empezar gratis
          </Link>
          <a href="#como-funciona" className="px-5 py-3 rounded-md border hover:bg-gray-50">Cómo funciona</a>
        </div>
      </div>
    </section>
  )
}