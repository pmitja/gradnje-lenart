'use client'

import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'

import { upsertTodayHours, getMyMonthHours, updateWorkHours, deleteWorkHours } from '@/actions/workhours'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import { useCurrentRole } from '@/hooks/use-current-role'

export default function EmployeeHoursPage() {
  const { toast } = useToast()
  const router = useRouter()
  const role = useCurrentRole()
  const today = useMemo(() => new Date(), [])
  const [hours, setHours] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [monthData, setMonthData] = useState<{ entries: any[]; total: number; overtime: number } | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)
  const [editHours, setEditHours] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [savingEdit, setSavingEdit] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const year = today.getFullYear()
  const monthIndex0 = today.getMonth()

  const load = async () => {
    const res = await getMyMonthHours(year, monthIndex0)
    if ('error' in res) {
      toast({ variant: 'destructive', title: 'Napaka', description: res.error })
    } else {
      setMonthData(res)
    }
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (role && role !== 'EMPLOYEE') {
      router.replace('/nadzorna-plosca')
    }
  }, [role, router])

  const onSubmit = async () => {
    setLoading(true)
    const res = await upsertTodayHours({ date: today.toISOString(), hours: Number(hours), description })
    if (res.success) {
      toast({ title: 'Uspeh', description: 'Ure shranjene.' })
      load()
      setHours('')
      setDescription('')
    } else {
      toast({ variant: 'destructive', title: 'Napaka', description: res.error || 'Napaka pri shranjevanju.' })
    }
    setLoading(false)
  }

  const startEdit = (entry: any) => {
    setSelected(entry)
    setEditHours(String(entry.hours))
    setEditDescription(entry.description || '')
    setEditOpen(true)
  }

  const saveEdit = async () => {
    if (!selected) return
    setSavingEdit(true)
    const res = await updateWorkHours(selected.id, {
      hours: Number(editHours),
      description: editDescription,
    })
    if ('success' in res) {
      toast({ title: 'Posodobljeno', description: 'Vnos je bil uspešno posodobljen.' })
      setEditOpen(false)
      setSelected(null)
      await load()
    } else {
      toast({ variant: 'destructive', title: 'Napaka', description: res.error || 'Napaka pri posodabljanju.' })
    }
    setSavingEdit(false)
  }

  const askDelete = (entry: any) => {
    setSelected(entry)
    setDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!selected) return
    setDeleting(true)
    const res = await deleteWorkHours(selected.id)
    if ('success' in res) {
      toast({ title: 'Izbrisano', description: 'Vnos je bil izbrisan.' })
      setDeleteOpen(false)
      setSelected(null)
      await load()
    } else {
      toast({ variant: 'destructive', title: 'Napaka', description: res.error || 'Napaka pri brisanju.' })
    }
    setDeleting(false)
  }

  return (
    <div className="w-full max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Vaše ure danes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">{format(today, 'PPP', { locale: sl })}</div>
          <Input type="number" inputMode="decimal" placeholder="Ure (npr. 8)" value={hours} onChange={(e) => setHours(e.target.value)} />
          <Textarea placeholder="Opis dela" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button disabled={loading} onClick={onSubmit}>Shrani</Button>
        </CardContent>
      </Card>

      {monthData && (
        <div className="mt-6 space-y-3">
          <div className="text-lg font-semibold">Mesec: {format(new Date(year, monthIndex0, 1), 'LLLL yyyy', { locale: sl })}</div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Skupaj: <span className="font-medium text-foreground">{monthData.total.toFixed(2)} h</span></span>
            <span>Prekoračene ure: <span className="font-medium text-foreground">{monthData.overtime.toFixed(2)} h</span></span>
          </div>
          <div className="mt-2 border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead className="w-24">Ure</TableHead>
                  <TableHead>Opis</TableHead>
                  <TableHead className="w-40 text-right">Dejanje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthData.entries.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{format(new Date(e.date), 'P', { locale: sl })}</TableCell>
                    <TableCell>{Number(e.hours).toFixed(2)}</TableCell>
                    <TableCell className="max-w-[500px] whitespace-pre-wrap">{e.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => startEdit(e)}>Uredi</Button>
                        <Button variant="destructive" size="sm" onClick={() => askDelete(e)}>Izbriši</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uredi vnos</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">{selected ? format(new Date(selected.date), 'PPP', { locale: sl }) : ''}</div>
            <Input type="number" inputMode="decimal" placeholder="Ure" value={editHours} onChange={(e) => setEditHours(e.target.value)} />
            <Textarea placeholder="Opis dela" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Prekliči</Button>
            <Button disabled={savingEdit} onClick={saveEdit}>{savingEdit ? 'Shranjujem...' : 'Shrani'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Izbrišem vnos?</AlertDialogTitle>
            <AlertDialogDescription>Te akcije ni mogoče razveljaviti.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Prekliči</AlertDialogCancel>
            <AlertDialogAction disabled={deleting} onClick={confirmDelete}>{deleting ? 'Brišem...' : 'Izbriši'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


