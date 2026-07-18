import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { ListChecksIcon, SaveIcon, SettingsIcon } from 'lucide-react'

import PraiseOptionsEditorForm from '@/components/backend/praise-options-editor-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { isAdminUser } from '@/lib/auth'
import { listPraiseOptionsWithFallback, savePraiseOptions } from '@/lib/praise-options'

type SettingsPageProps = {
  searchParams?: Promise<{
    praises?: string
  }>
}

const savePraiseOptionsAction = async (formData: FormData) => {
  'use server'

  const user = await currentUser()

  if (!isAdminUser(user)) {
    throw new Error('Unauthorized')
  }

  const labels = formData.getAll('labels').map(label => (typeof label === 'string' ? label : ''))

  await savePraiseOptions(labels)

  revalidatePath('/backend/settings')
  revalidatePath('/profile')
  revalidatePath('/members')
  revalidatePath('/fr/members')
  revalidatePath('/members/full')
  revalidatePath('/backend/members')

  redirect('/backend/settings?praises=saved')
}

const SettingsPage = async ({ searchParams }: SettingsPageProps) => {
  const praiseOptions = await listPraiseOptionsWithFallback()
  const resolvedSearchParams = await searchParams

  return (
    <div className='space-y-6'>
      <div>
        <Badge variant='outline'>Settings</Badge>
        <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Backend settings</h2>
        <p className='text-muted-foreground mt-2'>
          Placeholder configuration for organization profile and admin access.
        </p>
      </div>

      <Card className='max-w-3xl rounded-md'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <SettingsIcon className='size-5' />
            Organization profile
          </CardTitle>
          <CardDescription>These fields are disabled until persistent storage is connected.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='grid gap-4 sm:grid-cols-2'>
            <label className='space-y-2'>
              <span className='text-sm font-medium'>Organization name</span>
              <Input defaultValue='Bamena-USA' disabled />
            </label>
            <label className='space-y-2'>
              <span className='text-sm font-medium'>Support email</span>
              <Input defaultValue='codemenousa@gmail.com' disabled />
            </label>
            <label className='space-y-2 sm:col-span-2'>
              <span className='text-sm font-medium'>Portal status</span>
              <Input defaultValue='Placeholder mode - authentication not connected' disabled />
            </label>
            <div className='sm:col-span-2'>
              <Button disabled>
                <SaveIcon />
                Save settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className='max-w-3xl rounded-md'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <ListChecksIcon className='size-5' />
            Praise preferences
          </CardTitle>
          <CardDescription>Manage the praise names shown in member profiles and directory cards.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {resolvedSearchParams?.praises === 'saved' && (
            <p className='border-primary/30 bg-primary/10 rounded-md border px-4 py-3 text-sm font-medium'>
              Praise preferences saved.
            </p>
          )}
          <PraiseOptionsEditorForm options={praiseOptions} saveAction={savePraiseOptionsAction} />
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
