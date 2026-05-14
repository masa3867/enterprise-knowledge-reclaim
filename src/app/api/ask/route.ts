import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { IS_MOCK_MODE, MOCK_ANSWER, addQA } from '@/lib/mock-data'

const schema = z.object({ question: z.string().min(1) })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { question } = parsed.data

  if (IS_MOCK_MODE) {
    const entry = {
      id: `qa-${Date.now()}`,
      question,
      answer: MOCK_ANSWER.answer,
      citations: MOCK_ANSWER.citations,
      feedback: null as null,
      askedAt: new Date().toISOString(),
      model: 'mock',
    }
    addQA(entry)
    return NextResponse.json(entry)
  }

  // Real Claude RAG path (requires ANTHROPIC_API_KEY + vector DB setup)
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic()

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: question }],
  })

  const answer = message.content[0].type === 'text' ? message.content[0].text : ''
  const entry = {
    id: `qa-${Date.now()}`,
    question,
    answer,
    citations: [],
    feedback: null as null,
    askedAt: new Date().toISOString(),
    model: 'claude-sonnet-4-6',
  }
  addQA(entry)
  return NextResponse.json(entry)
}
