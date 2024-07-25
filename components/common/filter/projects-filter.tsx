'use client';

import { getAllLocations } from '@/actions/get-all-locations';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Location } from '@prisma/client';
import { Search } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAppStore } from '@/store/app';
import { projectFilterSchema } from '@/validation-schemas/project-filters-schema';

const ProjectsFilter = () => {
  const form = useForm<z.infer<typeof projectFilterSchema>>({
    resolver: zodResolver(projectFilterSchema),
    defaultValues: {
      location: '',
      type: '',
    },
  });

  const { projectFilters, updateProjectFilters } = useAppStore();

  const [isPending, startTransition] = useTransition();
  const [location, setLocation] = useState<Location[] | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const location = await getAllLocations();
      if (location) {
        setLocation(location);
      }
    });
  }, []);

  function onSubmit(values: z.infer<typeof projectFilterSchema>) {
    updateProjectFilters(values);
  }

  return (
    <Form {...form}>
      <div className="relative flex-col items-start gap-8 md:flex">
        {isPending && <div>Loading...</div>}
        {!isPending && (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-start gap-6">
            <fieldset className="grid grid-col-1 lg:grid-cols-3 items-center gap-4 lg:gap-9 rounded-lg lg:rounded-full border bg-body-200 p-4 lg:py-5 lg:px-10 shadow-sm max-w-fit">
              {location && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 pr-2 md:pr-4 lg:pr-6 lg:border-r-2 border-secondary-200">
                      <FormLabel className="text-text text-base font-bold lg:text-xl px-3">
                        Lokacija
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger
                            id="location"
                            className="flex gap-2 place-items-center items-start [&_[data-description]]:hidden bg-transparent border-0">
                            <SelectValue placeholder="Izberi lokacijo" />
                          </SelectTrigger>
                          <SelectContent>
                            {location.map((location) => (
                              <SelectItem
                                value={location.city}
                                key={location.id}>
                                {location.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 pr-2 md:pr-4 lg:pr-6 lg:border-r-2 border-secondary-200">
                    <FormLabel className="text-text text-base font-bold lg:text-xl px-3">
                      Lokacija
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger
                          id="type"
                          className="flex gap-2 items-start [&_[data-description]]:hidden bg-transparent border-0">
                          <SelectValue placeholder="Izberi vrsto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="vec-stanovanjski-objekt"
                            className="hover:bg-primary-50">
                            Več stanovanjski objekti
                          </SelectItem>
                          <SelectItem value="hisa">Hiše</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant={'primary'}
                className="w-full lg:w-auto flex gap-2 py-2 px-6 lg:py-3 lg:px-8">
                <Search />
                Filter
              </Button>
            </fieldset>
          </form>
        )}
      </div>
    </Form>
  );
};

export default ProjectsFilter;
