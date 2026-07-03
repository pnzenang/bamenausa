import { redirect } from 'next/navigation'

import { signUpPath } from '@/lib/auth'

const SignupPage = () => {
  redirect(signUpPath)
}

export default SignupPage
