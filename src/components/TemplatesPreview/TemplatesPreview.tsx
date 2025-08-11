import { useCVStore } from '../../store/useCVStore'

const templates = [
  { key: 'clasico', label: 'Clásico' },
  { key: 'moderno', label: 'Moderno' },
  { key: 'profesional', label: 'Profesional' },
  { key: 'minimalista', label: 'Minimalista' },
  { key: 'creativo', label: 'Creativo' },
] as const

export default function TemplatesPreview() {
  const plantilla = useCVStore((s) => s.settings.plantilla)
  const setSettings = useCVStore((s) => s.setSettings)

  return (
    <div className="p-3 border rounded-lg bg-white">
      <div className="font-medium mb-2">Plantillas</div>
      <div className="flex flex-wrap gap-2">
        {templates.map((t) => (
          <button
            key={t.key}
            onClick={() => setSettings({ plantilla: t.key as any })}
            className={`px-3 py-2 rounded border text-sm ${plantilla === t.key ? 'bg-blue-600 text-white' : ''}`}
          >{t.label}</button>
        ))}
      </div>
    </div>
  )
}