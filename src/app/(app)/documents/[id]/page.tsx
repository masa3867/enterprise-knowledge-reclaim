import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDoc } from '@/lib/mock-data'
import { formatDate, categoryLabel, categoryColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { ArrowLeft, FileText, Tag, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doc = getDoc(id)
  if (!doc) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link href="/documents" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft className="w-4 h-4" />
        ドキュメント一覧に戻る
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', categoryColor[doc.category])}>
                  {categoryLabel[doc.category]}
                </span>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{doc.system}</span>
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  インデックス済み
                </span>
              </div>
              <h1 className="text-lg font-semibold text-slate-900">{doc.title}</h1>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">概要</p>
            <p className="text-sm text-slate-700 leading-relaxed">{doc.excerpt}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Stat label="ページ数" value={`${doc.pageCount}ページ`} />
            <Stat label="アップロード日" value={formatDate(doc.uploadedAt)} />
            <Stat label="最終更新" value={formatDate(doc.updatedAt)} />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              タグ
            </p>
            <div className="flex flex-wrap gap-2">
              {doc.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
          <Link
            href={`/ask?q=${encodeURIComponent(`${doc.title}について教えてください`)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            このドキュメントについて質問する →
          </Link>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-lg px-3 py-2.5">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  )
}
