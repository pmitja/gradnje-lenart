/* eslint-disable max-len */

'use client'

import React from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Apartment, LocationType } from '@/types/general'

import EditApartmentForm from './edit-form'

interface EditApartmentDialogProps {
  apartment: Apartment
  id: string
  onCancel: () => void
  type: LocationType
  isAdmin: boolean
  onSuccess?: () => void // Add onSuccess prop
}

const EditApartmentDialog: React.FC<EditApartmentDialogProps> = ({
  apartment,
  id,
  onCancel,
  type,
  isAdmin,
  onSuccess, // Accept onSuccess
}) => (
  <Dialog open={true} onOpenChange={onCancel}>
    <DialogContent className='max-h-screen w-full max-w-[1400px] overflow-y-scroll'>
      <DialogHeader>
        <DialogTitle>Uredi {type === LocationType.Apartments ? 'stanovanje' : 'hišo'}</DialogTitle>
      </DialogHeader>
      {isAdmin ? (
        <EditApartmentForm data={apartment} onCancel={onCancel} id={id} type={type} onSuccess={onSuccess} />
      ) : (
        <p>Nimate dovoljenja za urejanje tega {type === LocationType.Apartments ? 'stanovanja' : 'hiše'}.</p>
      )}
    </DialogContent>
  </Dialog>
)

export default EditApartmentDialog
