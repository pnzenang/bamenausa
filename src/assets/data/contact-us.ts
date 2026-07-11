import { Clock8Icon, MapPinIcon, Mail, PhoneIcon, type LucideIcon } from 'lucide-react'

export type ContactInfoItem = {
  title: string
  icon: LucideIcon
  description: string
}

export const contactInfo: ContactInfoItem[] = [
  {
    title: 'DMV Monthly Meeting',
    icon: Clock8Icon,
    description: 'Third Saturday of the month\n7:00 pm to 9:00 pm'
  },
  {
    title: 'DMV Area',
    icon: MapPinIcon,
    description: '5020 Sunnyside Ave\nBeltsville, MD 20705'
  },
  {
    title: 'Email',
    icon: Mail,
    description: 'codemenousa@gmail.com'
  },
  {
    title: 'Volunteer Line',
    icon: PhoneIcon,
    description: 'Coming soon\nBoard contact'
  }
]
