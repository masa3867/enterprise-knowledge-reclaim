import { NextRequest, NextResponse } from 'next/server'
import { IS_MOCK_MODE } from '@/lib/mock-data'

export async function POST(_req: NextRequest) {
  if (IS_MOCK_MODE) {
    return NextResponse.json({
      ok: true,
      message: 'モックモードではドキュメントのインデックス処理はスキップされます。',
    })
  }

  // Real path: receive file, chunk, embed, store in vector DB
  return NextResponse.json({ error: 'Not implemented — configure ANTHROPIC_API_KEY and vector DB' }, { status: 501 })
}
