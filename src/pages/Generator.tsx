import { useState } from 'react'
import WizardForm from '../components/WizardForm/WizardForm'
import ClassicForm from '../components/ClassicForm/ClassicForm'
import TemplatesPreview from '../components/TemplatesPreview/TemplatesPreview'
import CVRenderer from '../components/CVRenderer/CVRenderer'
import PaymentModal from '../components/PaymentModal/PaymentModal'
import { useCVStore } from '../store/useCVStore'

export default function Generator() {
  const [mode, setMode] = useState<'wizard' | 'form'>('wizard')
  const isPaid = useCVStore((s) => s.isPaid)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-2 rounded border ${mode === 'wizard' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setMode('wizard')}
          >Wizard</button>
          <button
            className={`px-3 py-2 rounded border ${mode === 'form' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setMode('form')}
          >Formulario completo</button>
        </div>
        {mode === 'wizard' ? <WizardForm /> : <ClassicForm />}
      </div>
      <div className="space-y-4">
        <TemplatesPreview />
        <div className="border rounded-lg bg-white">
          <CVRenderer showWatermark={!isPaid} />
        </div>
        <PaymentModal />
      </div>
    </div>
  )
}