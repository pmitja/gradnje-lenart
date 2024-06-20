'use client';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ToggleGroup } from '@radix-ui/react-toggle-group';
import { ToggleGroupItem } from '@/components/ui/toggle-group';

enum StatusType {
  Prodaja = 'Na prodaj',
  Rezervirano = 'Rezervirano',
  Prodano = 'Prodano',
}

type Apartment = {
  'stevilka-stanovanja': string;
  naziv: string;
  etaza: string;
  kvadratura: string;
  'cena-brez-ddv': string;
  cena: string;
  status: StatusType;
};

const formSchema = z.object({
  'stevilka-stanovanja': z.string().min(1, {
    message: 'Vnesi številko ki je večja od nič, to polje je obvezno.',
  }),
  naziv: z.string().min(3, {
    message: 'Vnesi naziv ki je daljši od 3 znakov, to polje je obvezno.',
  }),
  etaza: z.string().min(1, {
    message: 'Vnesi etazo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  kvadratura: z.string().min(1, {
    message: 'Vnesi kvadraturo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  'cena-brez-ddv': z.string().min(1, {
    message:
      'Vnesi ceno brez ddv ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  cena: z.string().min(1, {
    message: 'Vnesi ceno ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  status: z.nativeEnum(StatusType),
});

export function DialogDemo({
  saveFormValues,
}: {
  saveFormValues: (values: Apartment) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'stevilka-stanovanja': '',
      naziv: '',
      etaza: '',
      kvadratura: '',
      'cena-brez-ddv': '',
      cena: '',
      status: StatusType.Prodaja,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    saveFormValues(values);
    setOpen(false);
  }

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Dodaj stanovanje</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj stanovanje</DialogTitle>
          <DialogDescription>
            Prosim vnesite točne podatke o stanovanju.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="stevilka-stanovanja"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Št. stanovanja</FormLabel>
                    <FormControl>
                      <Input
                        id="stevilka-stanovanja"
                        defaultValue="1"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="naziv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naziv</FormLabel>
                    <FormControl>
                      <Input
                        id="naziv"
                        defaultValue="2 sobno stanovanje"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="etaza"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etaža</FormLabel>
                    <FormControl>
                      <Input
                        id="etaza"
                        defaultValue="3. nadstropje"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="kvadratura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kvadratura</FormLabel>
                    <FormControl>
                      <Input
                        id="kvadratura"
                        defaultValue="3. nadstropje"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="cena-brez-ddv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena (brez ddv)</FormLabel>
                    <FormControl>
                      <Input
                        id="cena-brez-ddv"
                        defaultValue="100.000 €"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="cena"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena</FormLabel>
                    <FormControl>
                      <Input
                        id="cena"
                        defaultValue="130.000 €"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormItem>
                          <FormControl>
                            <ToggleGroupItem value={StatusType.Prodaja}>
                              {StatusType.Prodaja}
                            </ToggleGroupItem>
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <ToggleGroupItem value={StatusType.Rezervirano}>
                              {StatusType.Rezervirano}
                            </ToggleGroupItem>
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormControl>
                            <ToggleGroupItem value={StatusType.Prodano}>
                              {StatusType.Prodano}
                            </ToggleGroupItem>
                          </FormControl>
                        </FormItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Dodaj stanovanje</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const UserPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const saveFormValues = (values: Apartment) => {
    setApartments((prevApartments) => [...prevApartments, values]);
  };

  useEffect(() => {
    console.log(apartments);
  }, [apartments]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-primary-300">
            Dodajanje nove lokacije
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Prekliči
            </Button>
            <Button
              size="sm"
              variant={'primary'}
              className="border border-body-200">
              Dodaj lokacijo
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0" className="bg-primary-75">
              <CardHeader>
                <CardTitle>Osnovno</CardTitle>
                <CardDescription>
                  Prosim vnesi vse zahtevane podatke za uspešno dodajanje nove
                  lokacije.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Naziv</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue="Več stanovanjski objekt"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Opis</Label>
                    <Textarea
                      id="description"
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                      className="min-h-32"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Mesto</Label>
                    <Input id="city" defaultValue="Lenart" className="w-full" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Naslov</Label>
                    <Input
                      id="address"
                      defaultValue="Lenart"
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1" className="bg-primary-75">
              <CardHeader>
                <CardTitle>Stanovanja</CardTitle>
                <CardDescription>
                  V tabeli so prikazana vsa stanovanja, ki so trenutno dodana na
                  lokacijo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Št. stanovanja</TableHead>
                      <TableHead>Naziv</TableHead>
                      <TableHead>Etaža</TableHead>
                      <TableHead>Kvadratura</TableHead>
                      <TableHead>Cena (brez ddv)</TableHead>
                      <TableHead>Cena</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apartments.map((apartment, index) => (
                      <TableRow key={apartment['stevilka-stanovanja']}>
                        <TableCell className="font-semibold">
                          {apartment['stevilka-stanovanja']}
                        </TableCell>
                        <TableCell>{apartment.naziv}</TableCell>
                        <TableCell>{apartment.etaza}. nadstropje</TableCell>
                        <TableCell>{apartment.kvadratura} m2</TableCell>
                        <TableCell>{apartment['cena-brez-ddv']} €</TableCell>
                        <TableCell>{apartment.cena} €</TableCell>
                        <TableCell>
                          {apartment.status === StatusType.Prodaja && <div className="rounded-full h-4 w-4 bg-green-400"></div>}
                          {apartment.status === StatusType.Rezervirano && <div className="rounded-full h-4 w-4 bg-yellow-400"></div>}
                          {apartment.status === StatusType.Prodano && <div className="rounded-full h-4 w-4 bg-red-400"></div>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <DialogDemo saveFormValues={saveFormValues} />
              </CardFooter>
            </Card>
          </div>
          {/* <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-5" className='bg-primary-75'>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
