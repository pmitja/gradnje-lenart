'use client'

import React from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Apartment } from '@/types/general'

import EditApartmentForm from './edit-form'

interface EditApartmentFormProps {
  apartment: Apartment
  id?: string
  onCancel: () => void
}

const EditApartmentDialog: React.FC<EditApartmentFormProps> = ({ apartment, id, onCancel }) => (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className='max-h-screen w-full max-w-3xl overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Edit Apartment</DialogTitle>
        </DialogHeader>
        <EditApartmentForm data={apartment} onCancel={onCancel} id={id} />
      </DialogContent>
    </Dialog>
)

export default EditApartmentDialog
