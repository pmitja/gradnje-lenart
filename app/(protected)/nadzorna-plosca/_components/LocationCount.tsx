import { Activity } from 'lucide-react'

import { Card,
  CardContent,
  CardHeader,
  CardTitle } from '@/components/ui/card'

interface LocationCountProps {
  title: string
  count: number
}

export default function LocationCount({ title, count }: LocationCountProps) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Activity className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">Skupno število lokacij</p>
      </CardContent>
    </Card>
  )
}
