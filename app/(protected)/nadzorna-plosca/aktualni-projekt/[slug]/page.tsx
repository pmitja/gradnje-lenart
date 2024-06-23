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
import { RealEstate } from '@prisma/client';
import { getLocationRealEstates } from '@/actions/get-location-real-esatates';
import Spinner from '@/components/common/spinner';

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

const AktualniProjektPage = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [location, setLocation] = useState<RealEstate | null>(null);

  useEffect(() => {
    startTransition(() => {
      getLocationRealEstates(slug).then((result) => {
        setLocation(result as RealEstate | null);
      });
    });
  }, []);

  const form = useForm<z.infer<typeof mainFormSchema>>({
    resolver: zodResolver(mainFormSchema),
    defaultValues: {
      naziv: '',
      opis: '',
      mesto: '',
      naslov: '',
      stanovanja: apartments,
    },
  });

  const { setValue } = form;

  const saveFormValues = (values: Apartment) => {
    setApartments((prevApartments) => [...prevApartments, values]);
  };

  useEffect(() => {
    setValue('stanovanja', apartments);
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
      {!isPending && location && (
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-primary-300">
              {location.name}
            </h1>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-1" className="bg-primary-75">
                <CardHeader>
                  <CardTitle>Stanovanja</CardTitle>
                  <CardDescription>
                    V tabeli so prikazana vsa stanovanja, ki so trenutno dodana
                    na lokacijo.
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
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-5" className="bg-primary-75">
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
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      )}
      {isPending && (
        <div className="mx-auto flex min-h-[100dvh]">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      {!isPending && !location && (
        <section className=" dark:bg-gray-900 min-h-[100dvh] flex items-center">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
                404 error
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                Page not found
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Sorry, the page you are looking for doesn't exist.Here are some
                helpful links:
              </p>

              <div className="flex items-center mt-6 gap-x-3">
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Go back</span>
                </button>

                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                  Take me home
                </button>
              </div>
            </div>

            <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
              <img
                className="w-full max-w-lg lg:mx-auto"
                src="/404.svg"
                alt=""
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default AktualniProjektPage;
