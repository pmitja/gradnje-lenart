import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Project404 = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        ' dark:bg-gray-900 min-h-[100dvh] flex items-center',
        className
      )}>
      <div className="lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-primary-300 dark:text-primary-400">
            404 napaka
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-primary-300 dark:text-white md:text-3xl">
            Iskana lokacija ne obstaja
          </h1>
          <p className="mt-4 text-secondary-500 dark:text-gray-400">
            Se opravičujemo za težavo, vendar iskana lokacija ne obstaja.
            Prosimo, da preverite URL naslov in poskusite znova.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              variant={'outline'}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto ">
              <MoveLeft />
              <Link href={'/nadzorna-plosca'}>Nazaj na nadzorno ploščo</Link>
            </Button>

            <Button
              variant={'primary'}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors rounded-lg duration-200 shrink-0 sm:w-auto">
              <Link href={'/nadzorna-plosca/aktualni-projekt/nov'}>Dodaj novo lokacijo</Link>
            </Button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <Image
            className="w-full max-w-lg lg:mx-auto"
            src="/404.svg"
            alt="404 Image"
            height={32}
            width={32}
          />
        </div>
      </div>
    </section>
  );
};

export default Project404;