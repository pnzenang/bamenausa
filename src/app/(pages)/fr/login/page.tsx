import { redirect } from 'next/navigation'

import { signInPath } from '@/lib/auth'
import { getLocalizedHref } from '@/lib/i18n'

const FrenchLoginPage = () => {
  redirect(getLocalizedHref(signInPath, 'fr'))
}

export default FrenchLoginPage
