'use client'

import { useCallback, useEffect, useState } from 'react'
import RecentSales from '../_components/RecentSales'
import { getAllSales } from '@/actions/get-recent-sales'
import { Input } from '@/components/ui/input'
import { ArrowUpIcon, ArrowDownIcon, Search } from 'lucide-react'

interface Sale {
  id: string
  name: string
  priceWithTax: number | null
  updatedAt: Date
  customer?: {
    fullName: string
    email: string
  } | null
  client?: {
    name: string
    surname: string
    email: string
  } | null
  location: {
    name: string
  }
}

const PAGE_SIZE = 20

export default function RecentSalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'updatedAt' | 'priceWithTax' | 'customer'>('updatedAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const loadSales = useCallback(async (reset = false) => {
    setLoading(true)
    const { sales: newSales, total } = await getAllSales(
      reset ? 0 : page * PAGE_SIZE,
      PAGE_SIZE,
      search,
      sortBy,
      sortOrder
    )
    setSales((prev) => reset ? newSales : [...prev, ...newSales])
    setHasMore((reset ? newSales.length : sales.length + newSales.length) < total)
    setLoading(false)
  }, [page, sales.length, search, sortBy, sortOrder])

  useEffect(() => {
    loadSales(page === 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, sortOrder, search])

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((p) => p + 1)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(0)
  }

  const handleSort = (column: 'updatedAt' | 'priceWithTax' | 'customer') => {
    if (sortBy === column) {
      setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
    setPage(0)
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-2xl font-bold">Nedavne prodaje</h1>
      <div className="flex items-center gap-4 mb-2">
        <div className="relative max-w-2xl w-full">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Išči po stranki ali lokaciji..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-white shadow w-full">
        <table className="w-full text-sm">
          <thead className="bg-primary-50/50">
            <tr>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium"
                onClick={() => handleSort('customer')}
              >
                Stranka
                {sortBy === 'customer' && (sortOrder === 'asc' ? <ArrowUpIcon className="inline size-4 ml-1" /> : <ArrowDownIcon className="inline size-4 ml-1" />)}
              </th>
              <th className="px-4 py-3 text-left font-medium">Lokacija</th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium"
                onClick={() => handleSort('updatedAt')}
              >
                Datum
                {sortBy === 'updatedAt' && (sortOrder === 'asc' ? <ArrowUpIcon className="inline size-4 ml-1" /> : <ArrowDownIcon className="inline size-4 ml-1" />)}
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-right font-medium"
                onClick={() => handleSort('priceWithTax')}
              >
                Znesek
                {sortBy === 'priceWithTax' && (sortOrder === 'asc' ? <ArrowUpIcon className="inline size-4 ml-1" /> : <ArrowDownIcon className="inline size-4 ml-1" />)}
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => {
                const displayName = sale.client ? `${sale.client.name} ${sale.client.surname}` : sale.customer?.fullName || 'N/A';
                const displayEmail = sale.client ? sale.client.email : sale.customer?.email || 'N/A';
                const initials = sale.client
                  ? `${(sale.client.name[0] || '').toUpperCase()}${(sale.client.surname[0] || '').toUpperCase()}`
                  : (sale.customer?.fullName.slice(0, 2).toUpperCase() || 'NA');
                return (
                  <tr key={sale.id} className="hover:bg-primary-50/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary-200 flex items-center justify-center text-xs text-primary-foreground">
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium text-secondary-300">{displayName}</p>
                          <p className="text-xs text-muted-foreground">{displayEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{sale.location.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(sale.updatedAt).toLocaleDateString('sl-SI', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-medium text-primary-400">
                        {sale.priceWithTax?.toLocaleString('de-DE', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) || '0,00'} €
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="h-56 text-center text-muted-foreground">
                  Trenutno ni nedavnih prodaj.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {hasMore && (
          <div className="flex justify-center py-4">
            <button
              className="rounded bg-primary-200 px-4 py-2 text-primary-foreground hover:bg-primary-300 disabled:opacity-50"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Nalagam ...' : 'Naloži več'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 