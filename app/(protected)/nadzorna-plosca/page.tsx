import { getReservations } from '@/actions/get-reservations'
import { Badge } from '@/components/ui/badge'
import { Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle } from '@/components/ui/card'
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/utils'

import ReservationsList from './_components/ReservationsList'
import ReservationsSummary from './_components/ReservationsSummary'

const UserPage = async () => {
  const reservations = await getReservations()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 className="text-2xl font-bold">Dobrodošli na nadzorni plošči</h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <ReservationsSummary reservationsCount={reservations.length} />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Rezervacije</CardTitle>
                <CardDescription>
                  Nedavne rezervacije nepremičnin.
                </CardDescription>
              </div>
              <ReservationsList initialReservations={reservations} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stranka</TableHead>
                    <TableHead className="hidden xl:table-cell">Nepremičnina</TableHead>
                    <TableHead className="hidden xl:table-cell">Status</TableHead>
                    <TableHead className="text-right">Čas rezervacije</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.slice(0, 5).map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div className="font-medium">{reservation.fullName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {reservation.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        {reservation.realEstate.location}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <Badge className="text-xs" variant="outline">
                          Aktivna
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(reservation.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Add more cards or components here if needed */}
        </div>
      </main>
    </div>
  )
}

export default UserPage
