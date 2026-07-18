'use client'

import { useState } from 'react'

import { PlusIcon, SaveIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { PraiseOption } from '@/lib/praise-options'

type EditablePraiseOption = {
  id: string
  label: string
}

type PraiseOptionsEditorFormProps = {
  options: PraiseOption[]
  saveAction: (formData: FormData) => Promise<void>
}

const createEditableOption = (option: PraiseOption, index: number): EditablePraiseOption => ({
  id: `praise-option-${index}-${option.value}`,
  label: option.label
})

const getNewEditableOption = (index: number): EditablePraiseOption => ({
  id: `praise-option-new-${Date.now()}-${index}`,
  label: ''
})

const PraiseOptionsEditorForm = ({ options, saveAction }: PraiseOptionsEditorFormProps) => {
  const [items, setItems] = useState<EditablePraiseOption[]>(() => options.map(createEditableOption))

  const updateItem = (itemId: string, label: string) => {
    setItems(currentItems => currentItems.map(item => (item.id === itemId ? { ...item, label } : item)))
  }

  const addItem = () => {
    setItems(currentItems => [...currentItems, getNewEditableOption(currentItems.length)])
  }

  const removeItem = (itemId: string) => {
    setItems(currentItems => {
      if (currentItems.length <= 1) return currentItems

      return currentItems.filter(item => item.id !== itemId)
    })
  }

  return (
    <form action={saveAction} className='space-y-4'>
      <div className='divide-y rounded-md border'>
        {items.map((item, index) => (
          <div key={item.id} className='grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end'>
            <label className='space-y-2'>
              <span className='text-sm font-medium'>Praise {index + 1}</span>
              <Input
                name='labels'
                value={item.label}
                placeholder='Praise name'
                required={items.length === 1}
                onChange={event => updateItem(item.id, event.target.value)}
              />
            </label>
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='rounded-full'
              disabled={items.length <= 1}
              aria-label={`Remove praise ${index + 1}`}
              onClick={() => removeItem(item.id)}
            >
              <Trash2Icon />
            </Button>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap gap-2'>
        <Button type='button' variant='outline' className='rounded-full' onClick={addItem}>
          <PlusIcon />
          Add praise
        </Button>
        <Button type='submit' className='rounded-full'>
          <SaveIcon />
          Save praises
        </Button>
      </div>
    </form>
  )
}

export default PraiseOptionsEditorForm
