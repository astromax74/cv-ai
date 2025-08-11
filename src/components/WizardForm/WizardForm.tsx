import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCVStore } from '../../store/useCVStore'

const schema = z.object({
  nombreCompleto: z.string().min(2, 'Requerido'),
  email: z.string().email('Email inválido'),
})

type WizardValues = z.infer<typeof schema>

export default function WizardForm() {
  const { data, setData } = useCVStore()
  const { register, handleSubmit, formState: { errors } } = useForm<WizardValues>({
    resolver: zodResolver(schema),
    defaultValues: { nombreCompleto: data.nombreCompleto, email: data.email },
  })

  const onSubmit = (values: WizardValues) => {
    setData(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Nombre completo</label>
        <input className="w-full rounded border px-3 py-2" {...register('nombreCompleto')} />
        {errors.nombreCompleto && <p className="text-sm text-red-600">{errors.nombreCompleto.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input className="w-full rounded border px-3 py-2" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
    </form>
  )
}