import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export const categoryLabel: Record<string, string> = {
  design: '設計書', manual: 'マニュアル', ticket: 'チケット',
  minutes: '議事録', email: 'メール', other: 'その他',
}

export const categoryColor: Record<string, string> = {
  design: 'bg-blue-50 text-blue-700',
  manual: 'bg-green-50 text-green-700',
  ticket: 'bg-amber-50 text-amber-700',
  minutes: 'bg-purple-50 text-purple-700',
  email: 'bg-slate-50 text-slate-700',
  other: 'bg-gray-50 text-gray-600',
}
