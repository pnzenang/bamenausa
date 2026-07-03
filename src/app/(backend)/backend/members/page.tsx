import { MailIcon, SearchIcon, UsersRoundIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const members = [
  {
    name: 'Mariette F.',
    email: 'mariette@example.com',
    role: 'Volunteer',
    status: 'Active'
  },
  {
    name: 'Emmanuel K.',
    email: 'emmanuel@example.com',
    role: 'Events',
    status: 'Pending'
  },
  {
    name: 'Aline T.',
    email: 'aline@example.com',
    role: 'Treasury',
    status: 'Active'
  },
  {
    name: 'Patrick N.',
    email: 'patrick@example.com',
    role: 'Member',
    status: 'Review'
  }
]

const MembersPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <Badge variant='outline'>Members</Badge>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Member directory</h2>
          <p className='text-muted-foreground mt-2'>Placeholder records for profiles, roles, and membership status.</p>
        </div>
        <Button disabled>
          <UsersRoundIcon />
          Add member
        </Button>
      </div>

      <Card className='rounded-md'>
        <CardHeader>
          <CardTitle>Directory</CardTitle>
          <CardDescription>Search and membership tools will connect here.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='relative max-w-md'>
            <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input placeholder='Search members' className='pl-9' disabled />
          </div>

          <div className='divide-y rounded-md border'>
            {members.map(member => (
              <div
                key={member.email}
                className='grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_140px_120px] md:items-center'
              >
                <div>
                  <p className='font-medium'>{member.name}</p>
                  <p className='text-muted-foreground mt-1 flex items-center gap-2 text-sm'>
                    <MailIcon className='size-3.5' />
                    {member.email}
                  </p>
                </div>
                <span className='text-sm'>{member.role}</span>
                <Badge variant={member.status === 'Active' ? 'default' : 'outline'}>{member.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MembersPage
