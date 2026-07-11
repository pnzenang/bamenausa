export const marylandMeetingStartMonth = 9
export const marylandMeetingStartYear = 2025
export const marylandMeetingMonthCount = 12

export const marylandMeetingAddressLines = ['5020 Sunnyside Ave', 'Beltsville, MD 20705'] as const
export const marylandMeetingAddress = marylandMeetingAddressLines.join(', ')

const getThirdSaturdayDate = (year: number, month: number) => {
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1))
  const dayOffset = (6 - firstDayOfMonth.getUTCDay() + 7) % 7
  const thirdSaturdayDate = 1 + dayOffset + 14

  return new Date(Date.UTC(year, month, thirdSaturdayDate))
}

export const getMarylandMeetingDates = (startYear = marylandMeetingStartYear) => {
  return Array.from({ length: marylandMeetingMonthCount }, (_, offset) => {
    const absoluteMonth = marylandMeetingStartMonth + offset
    const year = startYear + Math.floor(absoluteMonth / 12)
    const month = absoluteMonth % 12

    return getThirdSaturdayDate(year, month)
  })
}

export const marylandMeetingDates = getMarylandMeetingDates()

export const getMarylandMeetingDateSlug = (date: Date) => date.toISOString().slice(0, 10)

export const getMarylandMeetingDateBySlug = (dateSlug: string) => {
  return marylandMeetingDates.find(date => getMarylandMeetingDateSlug(date) === dateSlug) ?? null
}
