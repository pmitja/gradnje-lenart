'use client'

import { Avatar,
  AvatarFallback,
  AvatarImage } from '@/components/ui/avatar'
import { Card,
  CardContent,
  CardHeader,
  CardTitle } from '@/components/ui/card'

  interface Sale {
    id: string
    name: string
    priceWithTax: number | null
    updatedAt: Date
    customer: {
      fullName: string
      email: string
    } | null
    location: {
      name: string
    }
  }

export default function RecentSales({ sales }: { sales: Sale[] }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Nedavne prodaje</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {sales && sales.map((sale) => (
          <div key={sale.id} className="flex items-center gap-4 rounded-md bg-primary-50 p-4">
            <Avatar className="hidden size-9 sm:flex">
              <AvatarImage src="/placeholder-avatar.png" alt="Avatar" />
              <AvatarFallback>{sale.customer?.fullName.slice(0, 2).toUpperCase() || 'NA'}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{sale.customer?.fullName || 'N/A'}</p>
              <p className="text-sm text-muted-foreground">{sale.customer?.email || 'N/A'}</p>
            </div>
            <div className="ml-auto font-medium">+ {sale.priceWithTax?.toLocaleString('de-DE', {
              minimumFractionDigits: 2, maximumFractionDigits: 2,
            }) || '0,00'} €</div>
          </div>
        ))}
        {(!sales || sales.length === 0) && <p>Trenutno ni nedavnih prodaj.</p>}
      </CardContent>
    </Card>
  )
}
