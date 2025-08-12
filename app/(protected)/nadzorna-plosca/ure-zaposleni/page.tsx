'use client'

import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useEffect, useMemo, useMemo as useReactMemo, useRef, useState } from 'react'

import { getEmployeesMonthSummary } from '@/actions/workhours'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// Note: import xlsx dynamically in the click handler to avoid SSR/bundle issues

export default function OwnerEmployeesPage() {
  const today = useMemo(() => new Date(), [])
  const year = today.getFullYear()
  const monthIndex0 = today.getMonth()
  const [data, setData] = useState<{ summaries: Array<{ user: any; total: number; overtime: number }> } | null>(null)
  const [query, setQuery] = useState('')
  const [exporting, setExporting] = useState(false)
  const [xlsxReady, setXlsxReady] = useState(false)
  const xlsxRef = useRef<any>(null)

  useEffect(() => {
    ;(async () => {
      const res = await getEmployeesMonthSummary(year, monthIndex0)
      if (!('error' in res)) setData(res)
    })()
  }, [])

  // Preload XLSX on mount to keep the click within a user gesture (avoids popup blockers)
  useEffect(() => {
    let mounted = true
    import('xlsx').then((mod) => {
      if (!mounted) return
      xlsxRef.current = mod
      setXlsxReady(true)
    })
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useReactMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    if (!q) return data.summaries
    return data.summaries.filter((s) =>
      (s.user.name || '').toLowerCase().includes(q) || (s.user.email || '').toLowerCase().includes(q),
    )
  }, [data, query])

  const monthlyTotal = useReactMemo(() => {
    if (!data) return 0
    return data.summaries.reduce((sum, s) => sum + Number(s.total || 0), 0)
  }, [data])

  const exportXlsx = () => {
    if (!data || !xlsxRef.current) return
    setExporting(true)
    const XLSX = xlsxRef.current
    const rows = data.summaries.map((s) => ({
      Uporabnik: s.user.name || s.user.email,
      Email: s.user.email,
      SkupajUr: Number(s.total || 0),
      Prekovtne: Number(s.overtime || 0),
      Mesec: format(new Date(year, monthIndex0, 1), 'LLLL yyyy', { locale: sl }),
    }))
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ure')
    const filename = `ure-${year}-${monthIndex0 + 1}.xlsx`
    XLSX.writeFile(workbook, filename)
    setExporting(false)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 mb-4">
        <div className="text-xl font-semibold">Zaposleni – {format(new Date(year, monthIndex0, 1), 'LLLL yyyy', { locale: sl })}</div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Input
            className="max-w-xs"
            placeholder="Išči uporabnike po imenu ali e-pošti"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Skupaj ur (mesec): <span className="font-medium text-foreground">{monthlyTotal.toFixed(2)} h</span>
            </div>
            <Button variant="outline" onClick={exportXlsx} disabled={!xlsxReady || !data}>
              {exporting ? 'Izvažam…' : 'Izvozi XLSX'}
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Card key={s.user.id}>
            <CardHeader>
              <CardTitle>{s.user.name || s.user.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Skupaj: {s.total.toFixed(2)} h</div>
               <div>Prekoračene: {s.overtime.toFixed(2)} h</div>
              <Link className="text-primary underline mt-2 inline-block" href={`/nadzorna-plosca/ure-zaposleni/${s.user.id}`}>Podrobnosti</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


