import { redirect } from 'next/navigation'

import { signUpPath } from '@/lib/auth'
import { getLocalizedHref } from '@/lib/i18n'

const FrenchSignupPage = () => {
  redirect(getLocalizedHref(signUpPath, 'fr'))
}

export default FrenchSignupPage
