'use client'

import {
  CalendarClockIcon,
  ChevronDownIcon,
  ClipboardListIcon,
  FileCheck2Icon,
  MegaphoneIcon,
  SendIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import type { MarylandMeetingWhatsAppAlertLink, MarylandMeetingWhatsAppAlertType } from '@/lib/whatsapp-alerts'

type MarylandMeetingWhatsAppAlertMenuProps = {
  alerts: MarylandMeetingWhatsAppAlertLink[]
  className?: string
  label?: string
}

const alertIcons: Record<MarylandMeetingWhatsAppAlertType, typeof CalendarClockIcon> = {
  reminder: CalendarClockIcon,
  agenda: ClipboardListIcon,
  change: MegaphoneIcon,
  report: FileCheck2Icon
}

const MarylandMeetingWhatsAppAlertMenu = ({
  alerts,
  className,
  label = 'WhatsApp'
}: MarylandMeetingWhatsAppAlertMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className={className}>
          <SendIcon />
          {label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>Send alert</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {alerts.map(alert => {
          const Icon = alertIcons[alert.type]

          return (
            <DropdownMenuItem key={alert.type} asChild>
              <a
                href={alert.href}
                target='_blank'
                rel='noreferrer'
                aria-label={`Send ${alert.label.toLowerCase()} on WhatsApp`}
              >
                <Icon />
                {alert.label}
              </a>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MarylandMeetingWhatsAppAlertMenu
