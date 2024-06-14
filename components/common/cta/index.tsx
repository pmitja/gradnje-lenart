import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, MoveUpRight } from 'lucide-react';
import Image from 'next/image';

const Cta = () => {
  return (
    <section className="min-w-[100vw] bg-primary-100 w-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] pb-3 md:pb-0">
      <div className="container w-full grid grid-cols-1 md:grid-cols-2 md:gap-16 md:justify-between">
        <Image
          src={'/cta-image.webp'}
          alt="Cta"
          width={1920}
          height={1080}
          className="max-h-[300px] md:max-h-auto aspect-square object-cover min-w-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] md:min-w-0 md:left-auto md:right-auto md:ml-auto md:mr-auto md:min-h-[460px]"
        />
        <div className='flex flex-col md:flex-col-reverse mt-8 gap-6 justify-center'>
          <div className="rounded-2xl border-4 border-secondary-100 py-2 px-3 flex justify-between items-center gap-3 md:max-w-[75%] md:row-start-3 max-h-[60px]">
            <Mail className="text-body-200" />
            <Input
              placeholder="Vaš elektronski naslov"
              className="bg-primary-100 border-none"
            />
            <Button
              variant={'rounded'}
              size={'rounded'}
              className="text-secondary-300 w-6 h-6 bg-body-300">
              <MoveUpRight className='w-6 h-6 min-w-6' />
            </Button>
          </div>
          <div className='flex flex-col gap-6'>
          <h2 className='text-[38px] lg:leading-[57px] font-bold text-body-200 self-center'>Prijavite se za najnovejše projekte</h2>
          <p className='text-base leading-5 text-secondary-300'>
            Nikar ne zamudite prihodnjih projektov! Prijavite se na našo listo
            obveščanja in bodite med prvimi, ki bodo izvedeli o naših novih
            nepremičninskih projektih.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
