import * as Dialog from '@radix-ui/react-dialog'
import { useCVStore } from '../../store/useCVStore'

export default function PaymentModal() {
  const isPaid = useCVStore((s) => s.isPaid)
  const setPaid = useCVStore((s) => s.setPaid)

  if (isPaid) return null

  const handleSimulatePayment = () => {
    setTimeout(() => setPaid(true), 800)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded">Pagar para descargar/enviar</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-md rounded-lg bg-white p-4 shadow-lg">
          <Dialog.Title className="font-semibold text-lg">Checkout</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Integrá MercadoPago (Checkout Pro). Por ahora, simulamos el pago.
          </Dialog.Description>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="px-3 py-2 rounded border">Cancelar</button>
            </Dialog.Close>
            <button onClick={handleSimulatePayment} className="px-3 py-2 rounded bg-emerald-600 text-white">Simular pago</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}