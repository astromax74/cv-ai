import { useCVStore } from '../../store/useCVStore'

export default function ClassicForm() {
  const { data, setData } = useCVStore()

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Teléfono</label>
        <input
          className="w-full rounded border px-3 py-2"
          value={data.telefono ?? ''}
          onChange={(e) => setData({ telefono: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Dirección</label>
        <input
          className="w-full rounded border px-3 py-2"
          value={data.direccion ?? ''}
          onChange={(e) => setData({ direccion: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Habilidades</label>
        <textarea
          className="w-full rounded border px-3 py-2"
          rows={4}
          value={data.habilidades}
          onChange={(e) => setData({ habilidades: e.target.value })}
        />
      </div>
    </div>
  )
}