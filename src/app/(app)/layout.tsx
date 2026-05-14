'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, MessageSquare, FileText, History, Database } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/ask', label: '質問する', icon: MessageSquare },
  { href: '/documents', label: 'ドキュメント', icon: FileText },
  { href: '/history', label: '回答履歴', icon: History },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col">
        <div className="flex items-center gap-2 px-5 h-14 border-b border-slate-200">
          <Database className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-slate-800 text-sm leading-tight">Enterprise<br />Knowledge</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Enterprise Knowledge</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
