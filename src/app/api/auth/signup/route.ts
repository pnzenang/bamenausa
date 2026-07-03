import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = () => {
  return NextResponse.json({
    ok: true,
    implemented: false,
    action: 'signup',
    message: 'Signup backend placeholder. Connect the real account creation flow here.'
  })
}

export const POST = GET
