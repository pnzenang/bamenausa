import { redirect } from 'next/navigation'

import { signInPath } from '@/lib/auth'

const LoginPage = () => {
  redirect(signInPath)
}

export default LoginPage
