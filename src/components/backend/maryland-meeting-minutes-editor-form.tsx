'use client'

import { useEffect, useRef, useState } from 'react'

import { MicIcon, PlusIcon, SaveIcon, SquareIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import type { MarylandMeetingAgendaDisplayItem } from '@/lib/maryland-meeting-minutes'

type EditableAgendaItem = MarylandMeetingAgendaDisplayItem & {
  id: string
}

type EditableAgendaField = 'title' | 'details'

type ListeningField = {
  itemId: string
  field: EditableAgendaField
}

type SpeechRecognitionAlternativeLike = {
  transcript: string
}

type SpeechRecognitionResultLike = {
  isFinal?: boolean
  [index: number]: SpeechRecognitionAlternativeLike | undefined
}

type SpeechRecognitionResultListLike = {
  length: number
  [index: number]: SpeechRecognitionResultLike | undefined
}

type SpeechRecognitionEventLike = {
  resultIndex: number
  results: SpeechRecognitionResultListLike
}

type SpeechRecognitionErrorEventLike = {
  error?: string
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  abort: () => void
  start: () => void
  stop: () => void
  onend: (() => void) | null
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

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

const getSpeechRecognitionConstructor = () => {
  if (typeof window === 'undefined') return null

  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }

  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

const MarylandMeetingMinutesEditorForm = ({
  dateSlug,
  agendaItems,
  disabled = false,
  saveAction
}: MarylandMeetingMinutesEditorFormProps) => {
  const [items, setItems] = useState<EditableAgendaItem[]>(() => agendaItems.map(createAgendaItem))
  const [listeningField, setListeningField] = useState<ListeningField | null>(null)
  const [speechError, setSpeechError] = useState('')
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const listeningFieldRef = useRef<ListeningField | null>(null)

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
    }
  }, [])

  const addAgendaItem = () => {
    setItems(currentItems => [...currentItems, getNewAgendaItem(currentItems.length)])
  }

  const removeAgendaItem = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId))
  }

  const updateAgendaItem = (itemId: string, field: EditableAgendaField, value: string) => {
    setItems(currentItems =>
      currentItems.map(item => (item.id === itemId ? { ...item, [field]: value } : item))
    )
  }

  const stopSpeechInput = () => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    listeningFieldRef.current = null
    setListeningField(null)
  }

  const applyTranscriptToField = ({ itemId, field }: ListeningField, baseValue: string, transcript: string) => {
    const trimmedTranscript = transcript.trim()

    if (!trimmedTranscript) return

    setItems(currentItems =>
      currentItems.map(item => {
        if (item.id !== itemId) return item

        const trimmedBaseValue = baseValue.trim()
        const separator = trimmedBaseValue ? (field === 'details' ? '\n' : ' ') : ''

        return {
          ...item,
          [field]: `${trimmedBaseValue}${separator}${trimmedTranscript}`
        }
      })
    )
  }

  const startSpeechInput = (itemId: string, field: EditableAgendaField) => {
    if (disabled) return

    if (listeningField?.itemId === itemId && listeningField.field === field) {
      stopSpeechInput()

      return
    }

    recognitionRef.current?.abort()

    const SpeechRecognition = getSpeechRecognitionConstructor()

    if (!SpeechRecognition) {
      setSpeechError('Speech input is not supported by this browser.')

      return
    }

    const activeField = { itemId, field }
    const baseValue = items.find(item => item.id === itemId)?.[field] ?? ''
    const recognition = new SpeechRecognition()
    let lastTranscript = ''

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = navigator.language || 'en-US'
    recognition.maxAlternatives = 1

    recognition.onresult = event => {
      const transcriptParts: string[] = []

      for (let index = 0; index < event.results.length; index += 1) {
        const transcript = event.results[index]?.[0]?.transcript

        if (transcript) {
          transcriptParts.push(transcript)
        }
      }

      const currentTranscript = transcriptParts.join(' ').replace(/\s+/g, ' ').trim()

      if (!currentTranscript || currentTranscript === lastTranscript) return

      lastTranscript = currentTranscript
      applyTranscriptToField(activeField, baseValue, currentTranscript)
    }

    recognition.onerror = () => {
      setSpeechError('Speech input stopped. Please try again.')
    }

    recognition.onend = () => {
      if (listeningFieldRef.current?.itemId === activeField.itemId && listeningFieldRef.current.field === activeField.field) {
        recognitionRef.current = null
        listeningFieldRef.current = null
        setListeningField(null)
      }
    }

    try {
      recognitionRef.current = recognition
      listeningFieldRef.current = activeField
      setListeningField(activeField)
      setSpeechError('')
      recognition.start()
    } catch {
      recognitionRef.current = null
      listeningFieldRef.current = null
      setListeningField(null)
      setSpeechError('Speech input could not start. Please try again.')
    }
  }

  const renderSpeechButton = (itemId: string, field: EditableAgendaField, label: string, className = '') => {
    const isListening = listeningField?.itemId === itemId && listeningField.field === field

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            variant={isListening ? 'secondary' : 'outline'}
            size='icon-sm'
            className={`rounded-full ${className}`}
            disabled={disabled}
            aria-label={isListening ? `Stop dictating ${label}` : `Dictate ${label}`}
            aria-pressed={isListening}
            onClick={() => startSpeechInput(itemId, field)}
          >
            {isListening ? <SquareIcon /> : <MicIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isListening ? 'Stop dictation' : 'Dictate'}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <TooltipProvider>
      <form action={saveAction} className='space-y-5'>
        <input type='hidden' name='dateSlug' value={dateSlug} />
        {speechError && <p className='text-destructive text-sm'>{speechError}</p>}
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

            <div className='space-y-2'>
              <label className='text-sm font-medium' htmlFor={`agenda-title-${item.id}`}>
                Agenda point
              </label>
              <div className='relative'>
                <Input
                  id={`agenda-title-${item.id}`}
                  name='agendaTitles'
                  value={item.title}
                  disabled={disabled}
                  className='pr-12'
                  aria-label={`Agenda point ${index + 1}`}
                  onChange={event => updateAgendaItem(item.id, 'title', event.target.value)}
                />
                {renderSpeechButton(
                  item.id,
                  'title',
                  `agenda point ${index + 1}`,
                  'absolute top-1/2 right-1.5 -translate-y-1/2'
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <label className='sr-only' htmlFor={`agenda-details-${item.id}`}>
                Agenda entry
              </label>
              <div className='relative'>
                <textarea
                  id={`agenda-details-${item.id}`}
                  name='agendaDetails'
                  rows={5}
                  value={item.details}
                  disabled={disabled}
                  className={`${textareaClassName} pr-12`}
                  aria-label={`Agenda entry ${index + 1}`}
                  onChange={event => updateAgendaItem(item.id, 'details', event.target.value)}
                />
                {renderSpeechButton(item.id, 'details', `agenda entry ${index + 1}`, 'absolute top-2 right-2')}
              </div>
            </div>
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
    </TooltipProvider>
  )
}

export default MarylandMeetingMinutesEditorForm
