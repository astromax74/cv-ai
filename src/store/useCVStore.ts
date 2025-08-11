import { create } from 'zustand'

export type Study = { titulo: string; institucion: string; fecha: string }
export type Experience = { empresa: string; puesto: string; periodo: string; descripcion: string }

export type CVData = {
  nombreCompleto: string
  dni?: string
  edad?: string
  email: string
  telefono?: string
  direccion?: string
  estudios: Study[]
  experiencias: Experience[]
  habilidades: string
  fotoDataUrl?: string
  linkedin?: string
  portfolio?: string
  ofertaTexto?: string
}

export type AppSettings = {
  aiProvider: 'openai' | 'deepseek'
  apiKey?: string
  plantilla: 'clasico' | 'moderno' | 'profesional' | 'minimalista' | 'creativo'
}

export type CVState = {
  data: CVData
  settings: AppSettings
  isPaid: boolean
  setData: (partial: Partial<CVData>) => void
  setSettings: (partial: Partial<AppSettings>) => void
  setPaid: (paid: boolean) => void
}

export const useCVStore = create<CVState>((set) => ({
  data: {
    nombreCompleto: '',
    email: '',
    estudios: [],
    experiencias: [],
    habilidades: '',
  },
  settings: { aiProvider: 'openai', plantilla: 'moderno' },
  isPaid: false,
  setData: (partial) => set((s) => ({ data: { ...s.data, ...partial } })),
  setSettings: (partial) => set((s) => ({ settings: { ...s.settings, ...partial } })),
  setPaid: (paid) => set({ isPaid: paid }),
}))