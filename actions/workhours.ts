'use server'

import { addMonths, endOfMonth, startOfDay, startOfMonth } from 'date-fns'
import { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { calculateOvertime, calculateOvertimeFromEntries } from '@/lib/workhours'

const WorkHoursSchema = z.object({
  date: z.string(), // ISO date
  hours: z.number().min(0).max(24),
  description: z.string().min(1).max(2000),
})

export async function upsertTodayHours(values: z.infer<typeof WorkHoursSchema>) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Niste prijavljeni.' }

  const parsed = WorkHoursSchema.safeParse(values)
  if (!parsed.success) return { error: 'Neveljavna polja.' }

  const dateOnly = startOfDay(new Date(parsed.data.date))
  const today = startOfDay(new Date())
  if (dateOnly.getTime() !== today.getTime()) {
    return { error: 'Ure lahko urejate samo za današnji dan.' }
  }

  try {
    await db.workHours.upsert({
      where: { userId_date: { userId: session.user.id, date: dateOnly } },
      update: {
        hours: parsed.data.hours,
        description: parsed.data.description,
      },
      create: {
        userId: session.user.id,
        date: dateOnly,
        hours: parsed.data.hours,
        description: parsed.data.description,
      },
    })
    return { success: 'Ure shranjene.' }
  } catch (e) {
    return { error: 'Napaka pri shranjevanju ur.' }
  }
}

export async function getMyMonthHours(year: number, monthIndex0: number) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Niste prijavljeni.' }
  const start = startOfMonth(new Date(year, monthIndex0, 1))
  const end = endOfMonth(start)
  const rawEntries = await db.workHours.findMany({
    where: { userId: session.user.id, date: { gte: start, lte: end } },
    orderBy: { date: 'asc' },
  })
  const entries = rawEntries.map((e) => ({
    id: e.id,
    userId: e.userId,
    date: e.date.toISOString(),
    hours: Number(e.hours),
    description: e.description,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }))
  const total = entries.reduce((sum, e) => sum + Number(e.hours), 0)
  const overtime = calculateOvertimeFromEntries(entries)
  return { entries, total, overtime }
}

export async function getEmployeesMonthSummary(year: number, monthIndex0: number) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') return { error: 'Nimate dovoljenja.' }
  const start = startOfMonth(new Date(year, monthIndex0, 1))
  const end = endOfMonth(start)
  const users = await db.user.findMany({ select: { id: true, name: true, email: true, role: true } })
  const employeeUsers = users.filter((u) => u.role === 'EMPLOYEE')
  const summaries = await Promise.all(
    employeeUsers.map(async (u) => {
      const rawEntries = await db.workHours.findMany({
        where: { userId: u.id, date: { gte: start, lte: end } },
      })
      const total = rawEntries.reduce((s, e) => s + Number(e.hours), 0)
      const overtime = calculateOvertimeFromEntries(rawEntries.map((e) => ({ hours: Number(e.hours) })))
      return { user: u, total, overtime }
    }),
  )
  return { summaries }
}

export async function getEmployeeMonthDetail(userId: string, year: number, monthIndex0: number) {
  const session = await auth()
  if (!session?.user) return { error: 'Niste prijavljeni.' }
  if (session.user.role !== 'ADMIN' && session.user.id !== userId) return { error: 'Nimate dovoljenja.' }
  const start = startOfMonth(new Date(year, monthIndex0, 1))
  const end = endOfMonth(start)
  const rawEntries = await db.workHours.findMany({ where: { userId, date: { gte: start, lte: end } }, orderBy: { date: 'asc' } })
  const entries = rawEntries.map((e) => ({
    id: e.id,
    userId: e.userId,
    date: e.date.toISOString(),
    hours: Number(e.hours),
    description: e.description,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }))
  const total = entries.reduce((s, e) => s + Number(e.hours), 0)
  const overtime = calculateOvertimeFromEntries(entries)
  return { entries, total, overtime }
}

const EditWorkHoursSchema = z.object({
  hours: z.number().min(0).max(24),
  description: z.string().min(1).max(2000),
})

export async function updateWorkHours(entryId: string, values: z.infer<typeof EditWorkHoursSchema>) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Niste prijavljeni.' }

  const parsed = EditWorkHoursSchema.safeParse(values)
  if (!parsed.success) return { error: 'Neveljavna polja.' }

  const entry = await db.workHours.findUnique({ where: { id: entryId } })
  if (!entry) return { error: 'Vnos ni bil najden.' }

  const isAdmin = session.user.role === 'ADMIN'
  const isOwner = entry.userId === session.user.id
  if (!isAdmin && !isOwner) return { error: 'Nimate dovoljenja.' }

  try {
    await db.workHours.update({
      where: { id: entryId },
      data: {
        hours: parsed.data.hours,
        description: parsed.data.description,
      },
    })
    return { success: 'Vnos posodobljen.' }
  } catch (e) {
    return { error: 'Napaka pri posodabljanju vnosa.' }
  }
}

export async function deleteWorkHours(entryId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Niste prijavljeni.' }

  const entry = await db.workHours.findUnique({ where: { id: entryId } })
  if (!entry) return { error: 'Vnos ni bil najden.' }

  const isAdmin = session.user.role === 'ADMIN'
  const isOwner = entry.userId === session.user.id
  if (!isAdmin && !isOwner) return { error: 'Nimate dovoljenja.' }

  try {
    await db.workHours.delete({ where: { id: entryId } })
    return { success: 'Vnos izbrisan.' }
  } catch (e) {
    return { error: 'Napaka pri brisanju vnosa.' }
  }
}


