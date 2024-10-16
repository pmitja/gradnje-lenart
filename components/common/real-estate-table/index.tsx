'use client'

import { Location, RealEstate } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table'
import { formatNumber } from '@/lib/helpers'
import { cn } from '@/lib/utils'

interface RealEstateTableProps {
  location: Location & { realEstates: RealEstate[] }
  slug: string
}

const RealEstateTable: React.FC<RealEstateTableProps> = ({ location, slug }) => {
  const isMultiApartment = location.type === 'Večstanovanjski objekt'

  return (
    <>
      <h2 className='text-xl font-bold leading-none tracking-tight text-secondary-400 lg:text-3xl'>
        Cenik
      </h2>
      <Table>
        <TableHeader className='text-secondary-400'>
          <TableRow isHeader className='bg-primary-100 text-secondary-500 '>
            <TableHead className="w-[100px]">Številka</TableHead>
            <TableHead>Ime</TableHead>
            {isMultiApartment && <TableHead>Nadstropje</TableHead>}
            <TableHead>Velikost</TableHead>
            <TableHead>Cena</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Povezava</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {location.realEstates.map((realEstate, index) => (
            <TableRow key={realEstate.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{realEstate.name}</TableCell>
              {isMultiApartment && <TableCell>{realEstate.floor}</TableCell>}
              <TableCell>{realEstate.size} m²</TableCell>
              <TableCell>{formatNumber(Number(realEstate.priceWithTax))} €</TableCell>
              <TableCell className={cn(
                'font-medium',
                realEstate.status === 'Na prodaj' && 'bg-green-100 text-green-800',
                realEstate.status === 'Rezervirano' && 'bg-orange-100 text-orange-800',
                realEstate.status === 'Prodano' && 'bg-red-100 text-red-800',
              )}>
                {realEstate.status}
              </TableCell>
              <TableCell className="text-right">
                {realEstate.status === 'Na prodaj' && (
                  <Button asChild variant="primary" size="sm">
                    <Link href={`${slug}/${realEstate.id}`}>Preveri</Link>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default RealEstateTable
