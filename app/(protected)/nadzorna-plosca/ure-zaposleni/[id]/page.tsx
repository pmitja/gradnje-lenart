'use client'

import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'

import { deleteWorkHours, getEmployeeMonthDetail, updateWorkHours } from '@/actions/workhours'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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

export default function EmployeeDetailPage() {
  const { toast } = useToast()
  const params = useParams<{ id: string }>()
  const id = params?.id as string
  const today = useMemo(() => new Date(), [])
  const year = today.getFullYear()
  const monthIndex0 = today.getMonth()
  const [data, setData] = useState<{ entries: any[]; total: number; overtime: number } | null>(null)

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)
  const [editHours, setEditHours] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [savingEdit, setSavingEdit] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    if (!id) return
    const res = await getEmployeeMonthDetail(id, year, monthIndex0)
    if (!('error' in res)) setData(res)
  }

  useEffect(() => {
    ;(async () => {
      await load()
    })()
  }, [id])

  if (!id) return null

  const startEdit = (entry: any) => {
    setSelected(entry)
    setEditHours(String(entry.hours))
    setEditDescription(entry.description || '')
    setEditOpen(true)
  }

  const saveEdit = async () => {
    if (!selected) return
    setSavingEdit(true)
    const res = await updateWorkHours(selected.id, { hours: Number(editHours), description: editDescription })
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
    <div className="w-full max-w-4xl">
      <div className="text-xl font-semibold mb-4">Podrobnosti – {format(new Date(year, monthIndex0, 1), 'LLLL yyyy', { locale: sl })}</div>
      <div className="flex gap-6 text-sm text-muted-foreground mb-2">
        <span>Skupaj: <span className="font-medium text-foreground">{data?.total.toFixed(2)} h</span></span>
        <span>Prekoračene ure: <span className="font-medium text-foreground">{data?.overtime.toFixed(2)} h</span></span>
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
            {data?.entries.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{format(new Date(e.date), 'P', { locale: sl })}</TableCell>
                <TableCell>{Number(e.hours).toFixed(2)}</TableCell>
                <TableCell className="max-w-[600px] whitespace-pre-wrap">{e.description}</TableCell>
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


