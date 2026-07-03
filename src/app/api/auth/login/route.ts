import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = () => {
  return NextResponse.json({
    ok: true,
    implemented: false,
    action: 'login',
    message: 'Login backend placeholder. Connect the real authentication provider here.'
  })
}

export const POST = GET
