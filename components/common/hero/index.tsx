import Image from 'next/image';
import ButtonWithIcon from '../button-with-icon';
import DoubleChervonRightIcon from '@/components/icons/double-chervon-right';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-w-[100vw] bg-primary-75 w-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="container w-full grid lg:grid-cols-2 justify-center relative lg:gap-6 gap-10 lg:w-full">
        <div className="flex flex-col gap-5 justify-center relative">
          <div className="bg-primary-500 px-5 py-2 flex gap-[10px] text-body-200 rounded-2xl max-w-fit font-semibold font-archivo">
            <DoubleChervonRightIcon />
            Pozdravljeni, najdite svoje sanje!
          </div>
          <h2 className="text-4xl leading-[57px] font-bold md:text-[51px] md:leading-[76.5px] lg:mt-2">
            Najdite, kupite & stanujte v svoji nepremični z nami!
          </h2>
          <p className="font-archivo text-xl leading-8 text-secondary-200">
            Imeli boste vse pomembno v svoji bližini: trgovino, banko, pošto,
            šolo, vrtec, družinam prijazne soseske...
          </p>
          <div className="flex gap-5 lg:gap-10 flex-wrap lg:mt-3">
            <ButtonWithIcon variant="primary" className="text-xl px-6 py-4">
              Akutalni projekti
            </ButtonWithIcon>
            <ButtonWithIcon variant="secondary" className="text-xl px-6 py-4">
              Vstopite v stik
            </ButtonWithIcon>
          </div>
          <Image
            src={'/hero-pattern.webp'}
            alt="Pattern"
            width="260"
            height="230"
            className="hidden lg:block absolute bottom-[-1px] right-[-25px]"
          />
        </div>
        <div className="w-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] flex flex-col items-center lg:w-full lg:left-auto lg:right-auto lg:ml-auto lg:mr-auto">
          <div className="relative md:flex md:flex-col md:items-center md:w-full">
            <Image
              src="/hero-image.webp"
              alt="Hero image"
              width="795"
              height="700"
              className="max-h-[310px] md:min-h-[700px] object-cover md:w-full"
            />
            <span className="bg-[#3E5566]/50 px-5 py-3 lg:py-3 lg:px-8 text-xl leading-8 text-body-200 font-bold absolute bottom-0 left-0 font-archivo md:hidden lg:block">
              Aktualni projekti
            </span>
            <Image
              src={'/hero-pattern-2.webp'}
              alt="Pattern"
              width="177"
              height="166"
              className="hidden lg:block absolute bottom-0 right-0"
            />
          </div>
          <div className="bg-body-75 px-5 py-3 lg:p-8 flex gap-4 flex-col lg:flex-row">
            <div className='flex flex-col gap-3'>
            <h3 className="text-xl font-bold text-secondary-400">
              Večstanovanjskih objekt - Lenart
            </h3>
          
              <p className="text-base text-secondary-400 leading-5 font-archivo"> 
                Nov, sodoben večstanovanjski objekt v Lenartu - vrhunska bivalna
                izkušnja v idiličnem okolju. Prijazne cene in vrhunska kakovost
                bivanja
              </p>
              </div>
              <Button variant={'rounded'} size={'rounded'} className='text-body-200 min-w-[68px] w-[68px] h-[68px] self-end lg:self-auto'>
                <ArrowUpRight />
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
