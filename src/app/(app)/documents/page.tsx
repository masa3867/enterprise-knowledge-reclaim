import Link from 'next/link'
import { getDocs } from '@/lib/mock-data'
import { formatDate, categoryLabel, categoryColor } from '@/lib/utils'
import { FileText, Upload, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default function DocumentsPage() {
  const docs = getDocs()

  const systems = Array.from(new Set(docs.map(d => d.system)))

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">ドキュメント一覧</h1>
          <p className="text-sm text-slate-500 mt-1">{docs.length} 件のドキュメントがインデックス済み</p>
        </div>
        <button
          disabled
          title="モックモードではアップロード不可"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          ドキュメントを追加
        </button>
      </div>

      {/* System tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {systems.map(s => (
          <span key={s} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">{s}</span>
        ))}
      </div>

      {/* Doc list */}
      <div className="space-y-3">
        {docs.map(doc => (
          <Link
            key={doc.id}
            href={`/documents/${doc.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex-shrink-0">
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', categoryColor[doc.category])}>
                    {categoryLabel[doc.category]}
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{doc.system}</span>
                  <span className="text-xs text-slate-400">{doc.pageCount}ページ</span>
                </div>
                <h2 className="text-sm font-medium text-slate-900 truncate">{doc.title}</h2>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{doc.excerpt}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-slate-500">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                  <span className="ml-auto text-xs text-slate-400 flex-shrink-0">{formatDate(doc.uploadedAt)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
