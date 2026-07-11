'use client'

import { useState } from 'react'

import { PlusIcon, SaveIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { MarylandMeetingAgendaDisplayItem } from '@/lib/maryland-meeting-minutes'

type EditableAgendaItem = MarylandMeetingAgendaDisplayItem & {
  id: string
}

type MarylandMeetingMinutesEditorFormProps = {
  dateSlug: string
  agendaItems: MarylandMeetingAgendaDisplayItem[]
  disabled?: boolean
  saveAction: (formData: FormData) => Promise<void>
}

const textareaClassName =
  'border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 min-h-32 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'

const createAgendaItem = (item: MarylandMeetingAgendaDisplayItem, index: number): EditableAgendaItem => ({
  ...item,
  id: `agenda-${index}-${item.title}`
})

const getNewAgendaItem = (index: number): EditableAgendaItem => ({
  id: `agenda-new-${Date.now()}-${index}`,
  title: `(${index + 1}) `,
  details: ''
})

const MarylandMeetingMinutesEditorForm = ({
  dateSlug,
  agendaItems,
  disabled = false,
  saveAction
}: MarylandMeetingMinutesEditorFormProps) => {
  const [items, setItems] = useState<EditableAgendaItem[]>(() => agendaItems.map(createAgendaItem))

  const addAgendaItem = () => {
    setItems(currentItems => [...currentItems, getNewAgendaItem(currentItems.length)])
  }

  const removeAgendaItem = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId))
  }

  return (
    <form action={saveAction} className='space-y-5'>
      <input type='hidden' name='dateSlug' value={dateSlug} />
      {items.length === 0 && (
        <div className='bg-muted/40 rounded-md border border-dashed px-4 py-6 text-sm text-muted-foreground'>
          No agenda points yet. Add the first agenda point to start.
        </div>
      )}
      {items.map((item, index) => (
        <div key={item.id} className='space-y-3 rounded-md border p-4'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm font-semibold'>Meeting point {index + 1}</p>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='rounded-full'
              disabled={disabled}
              onClick={() => removeAgendaItem(item.id)}
            >
              <Trash2Icon />
              Remove
            </Button>
          </div>

          <label className='block space-y-2'>
            <span className='text-sm font-medium'>Agenda point</span>
            <Input
              name='agendaTitles'
              defaultValue={item.title}
              disabled={disabled}
              aria-label={`Agenda point ${index + 1}`}
            />
          </label>
          <label className='block space-y-2'>
            <span className='sr-only'>Agenda entry</span>
            <textarea
              name='agendaDetails'
              rows={5}
              defaultValue={item.details}
              disabled={disabled}
              className={textareaClassName}
              aria-label={`Agenda entry ${index + 1}`}
            />
          </label>
        </div>
      ))}
      <div className='flex flex-wrap gap-2'>
        <Button type='button' variant='outline' className='rounded-full' disabled={disabled} onClick={addAgendaItem}>
          <PlusIcon />
          Add agenda point
        </Button>
        <Button type='submit' disabled={disabled}>
          <SaveIcon />
          Save and publish
        </Button>
      </div>
    </form>
  )
}

export default MarylandMeetingMinutesEditorForm
