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
import { useEffect, useState, useTransition } from 'react';
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
import { newLocation } from '@/actions/new-location';
import { Apartment, StatusType } from '@/types/general';
import { formSchema, mainFormSchema } from '@/schemas';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import Link from 'next/link';

export function DialogDemo({
  saveFormValues,
}: {
  saveFormValues: (values: Apartment) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: '',
      name: '',
      floor: '',
      size: 0,
      price: 0,
      priceWithTax: 0,
      status: StatusType.Prodaja,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    saveFormValues(values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Št. stanovanja</FormLabel>
                    <FormControl>
                      <Input
                        id="number"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naziv</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
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
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etaža</FormLabel>
                    <FormControl>
                      <Input
                        id="floor"
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
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kvadratura</FormLabel>
                    <FormControl>
                      <Input
                        id="size"
                        defaultValue="50"
                        className="col-span-3"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena (brez ddv)</FormLabel>
                    <FormControl>
                      <Input
                        id="price"
                        defaultValue="100000"
                        className="col-span-3"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
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
                name="priceWithTax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena</FormLabel>
                    <FormControl>
                      <Input
                        id="priceWithTax"
                        defaultValue="130000"
                        className="col-span-3"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
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
              <Button onClick={form.handleSubmit(onSubmit)}>Dodaj stanovanje</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const NovAktualniProjektPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof mainFormSchema>>({
    resolver: zodResolver(mainFormSchema),
    defaultValues: {
      name: '',
      description: '',
      city: '',
      address: '',
      apartments: apartments,
    },
  });

  const { setValue } = form;

  const saveFormValues = (values: Apartment) => {
    setApartments((prevApartments) => [...prevApartments, values]);
  };

  useEffect(() => {
    setValue('apartments', apartments);
  }, [apartments]);

  function onSubmit(values: z.infer<typeof mainFormSchema>) {
    setError('');
    setSuccess('');
    
    startTransition(() => {
      newLocation(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <Link href={'/nadzorna-plosca'}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
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
                  className="border border-body-200"
                  type="submit">
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
                      Prosim vnesi vse zahtevane podatke za uspešno dodajanje
                      nove lokacije.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Naziv</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="name"
                                  type="text"
                                  className="w-full"
                                  defaultValue="Več stanovanjski objekt"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opis</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  id="description"
                                  className="w-full min-h-32"
                                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mesto</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="city"
                                  type="text"
                                  className="w-full"
                                  defaultValue="Lenart"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Naslov</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="address"
                                  type="text"
                                  className="w-full"
                                  defaultValue="Jurovska cesta 14"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1" className="bg-primary-75">
                  <CardHeader>
                    <CardTitle>Stanovanja</CardTitle>
                    <CardDescription>
                      V tabeli so prikazana vsa stanovanja, ki so trenutno
                      dodana na lokacijo.
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
                        {apartments.map((apartment) => (
                          <TableRow key={apartment.number}>
                            <TableCell className="font-semibold">
                              {apartment.number}
                            </TableCell>
                            <TableCell>{apartment.name}</TableCell>
                            <TableCell>{apartment.floor}. nadstropje</TableCell>
                            <TableCell>{apartment.size} m2</TableCell>
                            <TableCell>
                              {apartment.price} €
                            </TableCell>
                            <TableCell>{apartment.priceWithTax} €</TableCell>
                            <TableCell>
                              {apartment.status === StatusType.Prodaja && (
                                <div className="rounded-full h-4 w-4 bg-green-400"></div>
                              )}
                              {apartment.status === StatusType.Rezervirano && (
                                <div className="rounded-full h-4 w-4 bg-yellow-400"></div>
                              )}
                              {apartment.status === StatusType.Prodano && (
                                <div className="rounded-full h-4 w-4 bg-red-400"></div>
                              )}
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
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </main>
  );
};

export default NovAktualniProjektPage;
