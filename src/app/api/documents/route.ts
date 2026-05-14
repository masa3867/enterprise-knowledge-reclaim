import { NextResponse } from 'next/server'
import { getDocs } from '@/lib/mock-data'

export async function GET() {
  return NextResponse.json(getDocs())
}
