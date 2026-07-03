import { SaveIcon, SettingsIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const SettingsPage = () => {
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
    </div>
  )
}

export default SettingsPage
