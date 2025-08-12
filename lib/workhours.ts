import { addDays, eachDayOfInterval, endOfMonth, isWeekend, startOfMonth } from 'date-fns'

export const NORMAL_HOURS_PER_DAY = 8

export function getWorkingDaysInMonth(year: number, monthIndex0: number): number {
  const start = startOfMonth(new Date(year, monthIndex0, 1))
  const end = endOfMonth(start)
  const days = eachDayOfInterval({ start, end })
  return days.filter((d) => !isWeekend(d)).length
}

export function getMonthStandardHours(year: number, monthIndex0: number): number {
  return getWorkingDaysInMonth(year, monthIndex0) * NORMAL_HOURS_PER_DAY
}

export function calculateOvertime(totalHours: number, year: number, monthIndex0: number): number {
  const standard = getMonthStandardHours(year, monthIndex0)
  return Math.max(0, totalHours - standard)
}

export function isToday(date: Date): boolean {
  const now = new Date()
  return now.toDateString() === date.toDateString()
}

// New per-day overtime calculation: every hour over NORMAL_HOURS_PER_DAY counts as overtime
export function calculateDailyOvertime(hoursForDay: number): number {
  return Math.max(0, Number(hoursForDay) - NORMAL_HOURS_PER_DAY)
}

// Sum monthly overtime by summing daily exceeds over NORMAL_HOURS_PER_DAY
export function calculateOvertimeFromEntries(entries: Array<{ hours: number }>): number {
  return entries.reduce((sum, e) => sum + calculateDailyOvertime(Number(e.hours)), 0)
}


