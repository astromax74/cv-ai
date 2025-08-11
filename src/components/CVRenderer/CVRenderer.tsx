import { useEffect, useRef, useState } from 'react'
import { useCVStore } from '../../store/useCVStore'
import { downloadPdfFromElement } from '../../services/pdfService'
import { generateQRCodeDataUrl } from '../../hooks/useQRCode'

type Props = { showWatermark?: boolean }

export default function CVRenderer({ showWatermark }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { data, settings } = useCVStore()
  const [qr, setQr] = useState<string | undefined>()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (data.linkedin) {
        try {
          const url = await generateQRCodeDataUrl(data.linkedin)
          if (!cancelled) setQr(url)
        } catch {
          if (!cancelled) setQr(undefined)
        }
      } else {
        setQr(undefined)
      }
    })()
    return () => { cancelled = true }
  }, [data.linkedin])

  const handleDownload = async () => {
    if (!ref.current) return
    await downloadPdfFromElement(ref.current, { filename: 'cv.pdf', addWatermark: !!showWatermark })
  }

  return (
    <div className="p-4 space-y-3">
      <div ref={ref} className="relative bg-white text-gray-900 p-6 border rounded min-h-[600px]">
        {showWatermark && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-15 select-none rotate-[-20deg] text-5xl font-bold text-gray-700">
            Vista previa
          </div>
        )}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-bold">{data.nombreCompleto || 'Tu nombre'}</div>
            <div className="text-sm text-gray-600">{data.email}</div>
            {data.telefono && <div className="text-sm text-gray-600">{data.telefono}</div>}
          </div>
          {qr && (
            <img src={qr} alt="LinkedIn QR" className="w-16 h-16" />
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Habilidades</h3>
          <p className="text-sm whitespace-pre-wrap">{data.habilidades}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleDownload} className="px-3 py-2 rounded bg-blue-600 text-white">
          Descargar PDF
        </button>
        <span className="text-xs text-gray-500">Plantilla: {settings.plantilla}</span>
      </div>
    </div>
  )
}