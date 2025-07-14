"use client"

import { startTransition, useEffect, useState } from "react"
import { getAllClients } from "@/actions/get-all-clients"
import { newClient } from "@/actions/new-client"
import { deleteClient } from "@/actions/delete-client"
import { updateClient } from "@/actions/update-client"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  FileText,
  Save,
  X,
  Loader2
} from "lucide-react"

interface Client {
  id: string
  name: string
  surname: string
  address: string
  phone: string
  email: string
  taxNumber: string
  idNumber: string
  createdAt: string
  updatedAt: string
}

export default function KlientiPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    surname: "",
    address: "",
    phone: "",
    email: "",
    taxNumber: "",
    idNumber: "",
  })
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState(form)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null)

  // Simple search implementation
  const filteredClients = search.trim() === '' 
    ? clients 
    : clients.filter((client) => {
        const searchTerm = search.toLowerCase()
        return (
          client.name?.toLowerCase().includes(searchTerm) ||
          client.surname?.toLowerCase().includes(searchTerm) ||
          client.email?.toLowerCase().includes(searchTerm) ||
          `${client.name} ${client.surname}`.toLowerCase().includes(searchTerm)
        )
      })

  // Debug logging
  console.log('Search debug:', { 
    search, 
    clientsTotal: clients.length, 
    filteredTotal: filteredClients.length,
    hasClients: clients.length > 0,
    firstClient: clients[0] ? {
      name: clients[0].name,
      surname: clients[0].surname,
      email: clients[0].email
    } : null
  })

  const fetchClients = async () => {
    setLoading(true)
    try {
      const data = await getAllClients()
      setClients(
        data.map((client: any) => ({
          ...client,
          createdAt: client.createdAt?.toString() ?? "",
          updatedAt: client.updatedAt?.toString() ?? "",
        }))
      )
    } catch (e) {
      toast.error("Napaka pri pridobivanju klientov.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    startTransition(() => {
      newClient(form).then((result) => {
        if (result.success) {
          toast.success('Klient je bil uspešno dodan!', {
            description: 'Vse spremembe so bile shranjene.'
          })
          setForm({
            name: "",
            surname: "",
            address: "",
            phone: "",
            email: "",
            taxNumber: "",
            idNumber: "",
          })
          setAddDialogOpen(false)
          fetchClients()
        }
      }).finally(() => {
        setLoading(false)
      })
    })
  }

  const handleEdit = (client: Client) => {
    setEditingId(client.id)
    setEditForm({
      name: client.name,
      surname: client.surname,
      address: client.address,
      phone: client.phone,
      email: client.email,
      taxNumber: client.taxNumber,
      idNumber: client.idNumber,
    })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    setLoading(true)
    try {
      await updateClient({ id: editingId, ...editForm })
      toast.success("Klient uspešno posodobljen.")
      setEditingId(null)
      fetchClients()
    } catch (e) {
      toast.error("Napaka pri posodabljanju klienta.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await deleteClient(id)
      toast.success("Klient izbrisan.")
      setDeleteDialogOpen(null)
      fetchClients()
    } catch (e) {
      toast.error("Napaka pri brisanju klienta.")
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name: string, surname: string) => {
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-100">
            <Users className="h-5 w-5 text-primary-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary-300">Upravljanje klientov</h1>
            <p className="text-muted-foreground">Dodajte, urejajte in upravljajte vaše kliente</p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary-200">
                <Users className="h-4 w-4 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-400">{clients.length}</p>
                <p className="text-sm text-muted-foreground">Skupaj klientov</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Išči po imenu, priimku ali emailu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
              {filteredClients.length} rezultatov
            </div>
          )}
        </div>
        
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-300 hover:bg-primary-400 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Dodaj klienta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary-300" />
                Dodaj novega klienta
              </DialogTitle>
              <DialogDescription>
                Vnesite podatke novega klienta. Vsa polja so obvezna.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-300">Ime</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ime"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-300">Priimek</label>
                  <Input
                    name="surname"
                    value={form.surname}
                    onChange={handleChange}
                    placeholder="Priimek"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-secondary-300">Naslov</label>
                  <Input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Naslov"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-300">Telefon</label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Telefon"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-300">Email</label>
                  <Input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-300">Davčna številka</label>
                  <Input
                    name="taxNumber"
                    value={form.taxNumber}
                    onChange={handleChange}
                    placeholder="Davčna številka"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-300">Matična številka</label>
                  <Input
                    name="idNumber"
                    value={form.idNumber}
                    onChange={handleChange}
                    placeholder="Matična številka"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddDialogOpen(false)}
                >
                  Prekliči
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-300 hover:bg-primary-400 text-white"
                >
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Dodaj klienta
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Clients Table */}
      <Card className="bg-white shadow-md border border-primary-100">
        <CardHeader className="bg-primary-50 rounded-t-lg border-b border-primary-100">
          <CardTitle className="flex items-center gap-2 text-secondary-400">
            <Users className="h-5 w-5" />
            Seznam klientov
          </CardTitle>
          <CardDescription>
            Pregled in upravljanje vseh registriranih klientov
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading && !clients.length ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary-300" />
              <span className="ml-2 text-muted-foreground">Nalagam kliente...</span>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-secondary-300 mb-2">
                {search ? "Ni rezultatov" : "Ni klientov"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {search 
                  ? "Poskusite z drugačnim iskanjem" 
                  : "Dodajte prvega klienta za začetek"
                }
              </p>
              {!search && (
                <Button
                  onClick={() => setAddDialogOpen(true)}
                  className="bg-primary-300 hover:bg-primary-400 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj klienta
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary-50/50">
                    <TableHead>Klient</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Naslov</TableHead>
                    <TableHead>Davčni podatki</TableHead>
                    <TableHead className="w-24">Akcije</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow 
                      key={client.id} 
                      className="hover:bg-primary-50/30 transition-colors"
                    >
                      {editingId === client.id ? (
                        // Edit mode
                        <>
                          <TableCell>
                            <div className="space-y-2">
                              <Input 
                                name="name" 
                                value={editForm.name} 
                                onChange={handleEditChange}
                                placeholder="Ime"
                                className="h-8"
                              />
                              <Input 
                                name="surname" 
                                value={editForm.surname} 
                                onChange={handleEditChange}
                                placeholder="Priimek"
                                className="h-8"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Input 
                                name="phone" 
                                value={editForm.phone} 
                                onChange={handleEditChange}
                                placeholder="Telefon"
                                className="h-8"
                              />
                              <Input 
                                name="email" 
                                value={editForm.email} 
                                onChange={handleEditChange}
                                placeholder="Email"
                                className="h-8"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input 
                              name="address" 
                              value={editForm.address} 
                              onChange={handleEditChange}
                              placeholder="Naslov"
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Input 
                                name="taxNumber" 
                                value={editForm.taxNumber} 
                                onChange={handleEditChange}
                                placeholder="Davčna št."
                                className="h-8"
                              />
                              <Input 
                                name="idNumber" 
                                value={editForm.idNumber} 
                                onChange={handleEditChange}
                                placeholder="Matična št."
                                className="h-8"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                onClick={handleEditSubmit} 
                                size="sm"
                                className="h-8 w-8 p-0 bg-success-300 hover:bg-success-400"
                                disabled={loading}
                              >
                                {loading ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Save className="h-3 w-3" />
                                )}
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setEditingId(null)}
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        // View mode
                        <>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-primary-200 flex items-center justify-center text-sm font-medium text-primary-600">
                                {getInitials(client.name, client.surname)}
                              </div>
                              <div>
                                <div className="font-medium text-secondary-300">
                                  {client.name} {client.surname}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ID: {client.idNumber}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{client.phone}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span className="text-primary-400">{client.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{client.address}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">Davčna: {client.taxNumber}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                onClick={() => handleEdit(client)}
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-primary-100"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={() => setDeleteDialogOpen(client.id)}
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-destructive-50 hover:text-destructive-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {filteredClients.length > 0 && (
          <CardFooter className="bg-primary-50/30 rounded-b-lg border-t border-primary-100">
            <p className="text-sm text-muted-foreground">
              Prikazano {filteredClients.length} od {clients.length} klientov
            </p>
          </CardFooter>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={deleteDialogOpen !== null} 
        onOpenChange={() => setDeleteDialogOpen(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive-500" />
              Potrdite brisanje
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ste prepričani, da želite izbrisati tega klienta? Ta akcija je nepovratna 
              in vsi podatki klienta bodo trajno izbrisani.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Prekliči</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialogOpen && handleDelete(deleteDialogOpen)}
              className="bg-destructive-500 hover:bg-destructive-600 text-white"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Izbriši klienta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 