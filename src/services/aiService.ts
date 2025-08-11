import { useCVStore } from '../store/useCVStore'

export type AIOutputs = {
  intro: string
  experiencias: string[]
  habilidades: string
  score: number
}

const BASE_PROMPT = `Generá un perfil profesional adaptado a esta oferta laboral. Usá un tono profesional, incluye las keywords del aviso y mantené un lenguaje claro y convincente. Luego, redactá las descripciones de experiencia laboral en ese mismo tono.`

export async function generateWithAI(params: { oferta: string; data: any }): Promise<AIOutputs> {
  const { settings } = useCVStore.getState()
  const { aiProvider, apiKey } = settings
  if (!apiKey) throw new Error('Falta API Key. Ingresala en Configuración.')

  const system = 'Sos un asistente experto en redacción de CVs en español de Argentina.'
  const user = `${BASE_PROMPT}\n\nOferta:\n${params.oferta}\n\nDatos actuales:\n${JSON.stringify(params.data)}`

  if (aiProvider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0.7,
      }),
    })
    const json = await res.json()
    const content: string = json.choices?.[0]?.message?.content ?? ''
    return postprocess(content)
  } else {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    })
    const json = await res.json()
    const content: string = json.choices?.[0]?.message?.content ?? ''
    return postprocess(content)
  }
}

function postprocess(text: string): AIOutputs {
  // Very naive parsing; to be improved with JSON outputs
  const intro = text.split('\n')[0] || ''
  return { intro, experiencias: [], habilidades: '', score: 0.8 }
}