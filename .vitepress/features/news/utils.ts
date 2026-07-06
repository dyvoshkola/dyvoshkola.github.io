export function normalizeNewsStatuses(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
      .filter((status): status is string => typeof status === 'string')
      .map((status) => status.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((status) => status.trim())
      .filter(Boolean)
  }

  return []
}

export function formatNewsPublishedDate(
  value: string,
  locale: string,
  timeZone: string,
  showYear = false
) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (!match) {
    return value
  }

  const [, year, month, day] = match
  const date = new Date(value)
  const hasValidDate = !Number.isNaN(date.getTime())
  const fallbackDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  const formatterDate = hasValidDate ? date : fallbackDate
  const datePart = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    ...(showYear ? { year: 'numeric' as const } : {}),
    timeZone
  }).format(formatterDate)
  const timeParts = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone
  }).formatToParts(formatterDate)
  const hour = timeParts.find((part) => part.type === 'hour')?.value ?? '00'
  const minute = timeParts.find((part) => part.type === 'minute')?.value ?? '00'

  return `${datePart}, ${hour}:${minute}`
}
