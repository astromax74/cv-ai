// @ts-expect-error html2pdf has no types
import html2pdf from 'html2pdf.js'

export async function downloadPdfFromElement(element: HTMLElement, options?: { filename?: string; addWatermark?: boolean }) {
  const opt = {
    margin: 10,
    filename: options?.filename ?? 'cv.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }

  const el = element.cloneNode(true) as HTMLElement
  if (options?.addWatermark) {
    const wm = document.createElement('div')
    wm.textContent = 'Vista previa'
    wm.style.position = 'absolute'
    wm.style.inset = '0'
    wm.style.display = 'grid'
    wm.style.placeItems = 'center'
    wm.style.opacity = '0.15'
    wm.style.transform = 'rotate(-20deg)'
    wm.style.fontSize = '64px'
    wm.style.fontWeight = 'bold'
    el.appendChild(wm)
  }

  await html2pdf().from(el).set(opt).save()
}