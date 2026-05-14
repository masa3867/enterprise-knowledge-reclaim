export type DocStatus = 'indexed' | 'processing' | 'error'
export type DocCategory = 'design' | 'manual' | 'ticket' | 'minutes' | 'email' | 'other'
export type FeedbackType = 'correct' | 'incorrect' | 'partial'

export type KnowledgeDocument = {
  id: string
  title: string
  category: DocCategory
  system: string
  pageCount: number
  status: DocStatus
  uploadedAt: string
  updatedAt: string
  excerpt: string
  tags: string[]
}

export type Citation = {
  docId: string
  docTitle: string
  excerpt: string
  page?: number
}

export type QAEntry = {
  id: string
  question: string
  answer: string
  citations: Citation[]
  feedback: FeedbackType | null
  askedAt: string
  model: string
}

export type SystemStats = {
  documentCount: number
  systemCount: number
  qaCount: number
  feedbackCount: number
  lastIndexed: string
}
