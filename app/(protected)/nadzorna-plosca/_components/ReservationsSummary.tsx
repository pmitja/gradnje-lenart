import { Activity } from 'lucide-react'

import { Card,
  CardContent,
  CardHeader,
  CardTitle } from '@/components/ui/card'

interface ReservationsSummaryProps {
  reservationsCount: number
}

export default function ReservationsSummary({ reservationsCount }: ReservationsSummaryProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Aktivne rezervacije</CardTitle>
        <Activity className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{reservationsCount}</div>
        <p className="text-xs text-muted-foreground">
          Skupno število aktivnih rezervacij
        </p>
      </CardContent>
    </Card>
  )
}
