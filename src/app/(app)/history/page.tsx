import { getQAs } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { BookOpen, CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react'
import type { FeedbackType } from '@/types'

export const dynamic = 'force-dynamic'

function FeedbackBadge({ feedback }: { feedback: FeedbackType | null }) {
  if (!feedback) return <span className="text-xs text-slate-400">未評価</span>
  const map = {
    correct: { label: '正確', cls: 'text-green-700 bg-green-50', Icon: CheckCircle },
    incorrect: { label: '不正確', cls: 'text-red-700 bg-red-50', Icon: XCircle },
    partial: { label: '一部正確', cls: 'text-amber-700 bg-amber-50', Icon: AlertCircle },
  }
  const { label, cls, Icon } = map[feedback]
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', cls)}>
      <Icon className="w-3 h-3" />{label}
    </span>
  )
}

export default function HistoryPage() {
  const qas = getQAs()

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">回答履歴</h1>
        <p className="text-sm text-slate-500 mt-1">{qas.length} 件の質問履歴</p>
      </div>

      {qas.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">まだ質問履歴がありません</p>
        </div>
      ) : (
        <div className="space-y-3">
          {qas.map(qa => (
            <details key={qa.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden group">
              <summary className="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 list-none">
                <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 line-clamp-2">{qa.question}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <FeedbackBadge feedback={qa.feedback} />
                    <span className="text-xs text-slate-400">{formatDate(qa.askedAt)}</span>
                    <span className="text-xs text-slate-300">{qa.model}</span>
                  </div>
                </div>
              </summary>

              <div className="border-t border-slate-100 px-5 py-4">
                <p className="text-xs font-medium text-slate-500 mb-2">回答</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed line-clamp-6">{qa.answer}</p>

                {qa.citations.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      参照元
                    </p>
                    <div className="space-y-1.5">
                      {qa.citations.map((c, i) => (
                        <div key={i} className="text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg">
                          {c.docTitle}{c.page ? ` (p.${c.page})` : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  )
}
