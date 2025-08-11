import QRCode from 'qrcode'

export async function generateQRCodeDataUrl(text: string): Promise<string> {
  return await QRCode.toDataURL(text, { width: 128 })
}