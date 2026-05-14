'use client'

import { useState } from 'react'
import { Send, Loader2, BookOpen, AlertCircle } from 'lucide-react'
import { cn, categoryLabel, categoryColor } from '@/lib/utils'
import type { QAEntry } from '@/types'

const IS_MOCK = process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || !process.env.NEXT_PUBLIC_HAS_API_KEY

export default function AskPage() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<QAEntry | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!question.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      })
      if (!res.ok) throw new Error('APIエラーが発生しました')
      const data: QAEntry = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  async function handleFeedback(feedback: 'correct' | 'incorrect' | 'partial') {
    if (!result) return
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qaId: result.id, feedback }),
    })
    setResult({ ...result, feedback })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">社内ドキュメントに質問する</h1>
        <p className="text-sm text-slate-500 mt-1">インデックス済みドキュメントを検索してAIが回答します</p>
      </div>

      {/* Mock banner */}
      <div className="mb-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium">モックモード動作中</span> —
          実際のAI回答を有効にするには <code className="text-xs bg-amber-100 px-1 rounded">ANTHROPIC_API_KEY</code> を設定してください。
        </div>
      </div>

      {/* Question form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e) } }}
            placeholder="例：受注管理システムで月次バッチが失敗した場合の手順は？"
            rows={3}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="self-end flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            送信
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          {/* Question echo */}
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
            <p className="text-xs font-medium text-slate-500 mb-1">質問</p>
            <p className="text-sm text-slate-800">{result.question}</p>
          </div>

          {/* Answer */}
          <div className="px-5 py-4">
            <p className="text-xs font-medium text-slate-500 mb-2">回答</p>
            <div
              className="prose prose-sm max-w-none text-slate-800 [&_strong]:font-semibold [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:rounded [&_blockquote]:border-l-4 [&_blockquote]:border-amber-400 [&_blockquote]:pl-3 [&_blockquote]:text-slate-600"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(result.answer) }}
            />
          </div>

          {/* Citations */}
          {result.citations.length > 0 && (
            <div className="border-t border-slate-100 px-5 py-4">
              <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                参照ドキュメント
              </p>
              <div className="space-y-2">
                {result.citations.map((c, i) => (
                  <div key={i} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-indigo-700">{c.docTitle}</span>
                      {c.page && <span className="text-xs text-slate-400">p.{c.page}</span>}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{c.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className="border-t border-slate-100 px-5 py-3 flex items-center gap-3">
            <span className="text-xs text-slate-500">この回答は役に立ちましたか？</span>
            {result.feedback ? (
              <span className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                result.feedback === 'correct' ? 'bg-green-100 text-green-700' :
                result.feedback === 'incorrect' ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              )}>
                {result.feedback === 'correct' ? '正確' : result.feedback === 'incorrect' ? '不正確' : '一部正確'}
              </span>
            ) : (
              <div className="flex gap-2">
                <FeedbackBtn label="正確" onClick={() => handleFeedback('correct')} color="green" />
                <FeedbackBtn label="一部正確" onClick={() => handleFeedback('partial')} color="amber" />
                <FeedbackBtn label="不正確" onClick={() => handleFeedback('incorrect')} color="red" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function FeedbackBtn({ label, onClick, color }: { label: string; onClick: () => void; color: 'green' | 'amber' | 'red' }) {
  const colors = { green: 'hover:bg-green-50 hover:text-green-700', amber: 'hover:bg-amber-50 hover:text-amber-700', red: 'hover:bg-red-50 hover:text-red-700' }
  return (
    <button onClick={onClick} className={cn('text-xs px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 transition-colors', colors[color])}>
      {label}
    </button>
  )
}

function markdownToHtml(md: string): string {
  return md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^#{1,3} (.+)$/gm, '<p class="font-semibold mt-3 mb-1">$1</p>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/\n/g, '<br />')
    .replace(/⚠️/g, '<span>⚠️</span>')
    .replace(/💡/g, '<span>💡</span>')
}
