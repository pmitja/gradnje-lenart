'use client'

import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { ArrowUpIcon } from 'lucide-react'

import { Avatar,
  AvatarFallback,
  AvatarImage } from '@/components/ui/avatar'
import { Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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

export default function RecentSales({ sales, onLoadMore, loading, hasMore }: { sales: Sale[], onLoadMore?: () => void, loading?: boolean, hasMore?: boolean }) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <CardHeader className="border-b border-primary-50 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Nedavne prodaje</CardTitle>
            <CardDescription>Pregled zadnjih prodaj in transakcij</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary-300">
            <ArrowUpIcon className="size-4" />
            <span>Novo</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {sales && sales.length > 0 ? (
          <div className="relative">
            <Table>
              <TableHeader className="bg-primary-50/50">
                <TableRow>
                  <TableHead>Stranka</TableHead>
                  <TableHead>Lokacija</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead className="text-right">Znesek</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.slice(0, 3).map((sale) => { // Only show last 3
                  const displayName = sale.client ? `${sale.client.name} ${sale.client.surname}` : sale.customer?.fullName || 'N/A';
                  const displayEmail = sale.client ? sale.client.email : sale.customer?.email || 'N/A';
                  const initials = sale.client
                    ? `${(sale.client.name[0] || '').toUpperCase()}${(sale.client.surname[0] || '').toUpperCase()}`
                    : (sale.customer?.fullName.slice(0, 2).toUpperCase() || 'NA');
                  return (
                    <TableRow key={sale.id} className="hover:bg-primary-50/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarImage src="/placeholder-avatar.png" alt="Avatar" />
                            <AvatarFallback className="bg-primary-200 text-xs text-primary-foreground">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-secondary-300">{displayName}</p>
                            <p className="text-xs text-muted-foreground">{displayEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{sale.location.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(sale.updatedAt), 'dd. MMM', {
                          locale: sl,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-medium text-primary-400">
                          {sale.priceWithTax?.toLocaleString('de-DE', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || '0,00'} €
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {hasMore && (
              <div className="flex justify-center py-4">
                <button
                  className="rounded bg-primary-200 px-4 py-2 text-primary-foreground hover:bg-primary-300 disabled:opacity-50"
                  onClick={onLoadMore}
                  disabled={loading}
                >
                  {loading ? 'Nalagam ...' : 'Naloži več'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-56 items-center justify-center text-muted-foreground">
            Trenutno ni nedavnih prodaj.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
