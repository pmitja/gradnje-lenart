'use client'

import { useEffect, useState } from 'react'

import { getRecentSales } from '@/actions/get-recent-sales'
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
  priceWithTax: number
  customer: {
    fullName: string
    email: string
  }
  location: {
    name: string
  }
}

export default function RecentSales() {
  const [ sales, setSales ] = useState<Sale[]>([])

  useEffect(() => {
    const fetchSales = async () => {
      const recentSales = await getRecentSales(5)

      setSales(recentSales)
    }

    fetchSales()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nedavne prodaje</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {sales.map((sale) => (
          <div key={sale.id} className="flex items-center gap-4">
            <Avatar className="hidden size-9 sm:flex">
              <AvatarImage src="/placeholder-avatar.png" alt="Avatar" />
              <AvatarFallback>{sale.customer.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{sale.customer.fullName}</p>
              <p className="text-sm text-muted-foreground">{sale.customer.email}</p>
            </div>
            <div className="ml-auto font-medium">+€{sale.priceWithTax.toFixed(2)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
