import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { setFeedback } from '@/lib/mock-data'

const schema = z.object({
  qaId: z.string(),
  feedback: z.enum(['correct', 'incorrect', 'partial']),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  setFeedback(parsed.data.qaId, parsed.data.feedback)
  return NextResponse.json({ ok: true })
}
