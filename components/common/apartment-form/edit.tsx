/* eslint-disable max-len */

'use client'

import React from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Apartment, LocationType } from '@/types/general'

import EditApartmentForm from './edit-form'

interface EditApartmentFormProps {
  apartment: Apartment
  id?: string
  onCancel: () => void
  type: LocationType
}

const EditApartmentDialog: React.FC<EditApartmentFormProps> = ({ apartment, id, onCancel, type }) => (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className='max-h-screen w-full max-w-3xl overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Edit Apartment</DialogTitle>
        </DialogHeader>
        <EditApartmentForm data={apartment} onCancel={onCancel} id={id} type={type} />
      </DialogContent>
    </Dialog>
)

export default EditApartmentDialog
