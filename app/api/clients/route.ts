import { NextResponse } from 'next/server'
import { getAllClients } from '@/actions/get-all-clients'

export async function GET() {
  const clients = await getAllClients()
  return NextResponse.json(clients)
} 