import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
      <h2 className="text-2xl font-semibold">¡Pago confirmado!</h2>
      <p>Tu PDF fue generado sin marca de agua y enviado al correo proporcionado.</p>
      <Link to="/generador" className="underline">Volver</Link>
    </div>
  )
}