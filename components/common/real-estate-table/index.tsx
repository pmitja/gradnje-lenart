'use client'

import { Location, RealEstate } from '@prisma/client'
import { ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table'
import { formatNumber } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { StatusType } from '@/types/general'

interface RealEstateTableProps {
  location: Location & { realEstates: RealEstate[] }
  slug: string
}

const RealEstateTable: React.FC<RealEstateTableProps> = ({ location, slug }) => {
  const isMultiApartment = location.type === 'Večstanovanjski objekt'

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-secondary-700 text-xl font-bold lg:text-2xl">
          Cenik nepremičnin
        </h2>
        <Badge variant="outline" className="text-secondary-500">
          {location.realEstates.length} {location.realEstates.length === 1 ? 'enota' : 'enot'}
        </Badge>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-secondary-700 py-4 font-medium">Številka</TableHead>
              <TableHead className="text-secondary-700 font-medium">Ime</TableHead>
              {isMultiApartment && <TableHead className="text-secondary-700 font-medium">Nadstropje</TableHead>}
              <TableHead className="text-secondary-700 font-medium">Velikost</TableHead>
              <TableHead className="text-secondary-700 font-medium">Cena</TableHead>
              <TableHead className="text-secondary-700 font-medium">Status</TableHead>
              <TableHead className="text-secondary-700 text-right font-medium">Povezava</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {location.realEstates.map((realEstate, index) => (
              <TableRow
                key={realEstate.id}
                className={cn(
                  'transition-colors',
                  realEstate.status === StatusType.Prodano && 'bg-gray-50/50',
                )}
              >
                <TableCell className="font-medium text-secondary-500">{index + 1}</TableCell>
                <TableCell className="font-medium">{realEstate.name}</TableCell>
                {isMultiApartment && <TableCell>{realEstate.floor}</TableCell>}
                <TableCell>{realEstate.size} m²</TableCell>
                <TableCell className="text-primary-600 font-medium">
                  {formatNumber(Number(realEstate.priceWithTax))} €
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      'font-medium',
                      realEstate.status === StatusType.Prodaja && 'bg-green-100 text-green-800 hover:bg-green-100',
                      realEstate.status === StatusType.Rezervirano && 'bg-orange-100 text-orange-800 hover:bg-orange-100',
                      realEstate.status === StatusType.Prodano && 'bg-red-100 text-red-800 hover:bg-red-100',
                    )}
                  >
                    {realEstate.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/projekt/${slug}/${realEstate.id}`}>
                    <Button
                      variant={realEstate.status === StatusType.Prodano ? 'outline' : 'primary'}
                      size="sm"
                      className="gap-1"
                    >
                      {realEstate.status === StatusType.Prodaja ? (
                        <>Preveri<ArrowRight className="size-3.5" /></>
                      ) : (
                        <>Ogled<Eye className="size-3.5" /></>
                      )}
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default RealEstateTable
