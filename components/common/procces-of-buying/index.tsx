import { CircleCheck } from 'lucide-react';
import ButtonWithIcon from '../button-with-icon';
import Image from 'next/image';

const listElements = [
  'Najdi svoje sanjsko stanovanje',
  'Dogovori se za ogled in pridobi vse ostale potrebne informacije',
  'Ogled je namenjen razščiščevanju ne jasnosti iz oglasa',
  'Svetovanje, glede potreb in finančna zmogljivost',
  'Sestava pogodbe in pregled pogodbe',
  'Podpis pogodbe',
  'Predaja nepremičnine in vselitev',
];

const ProccesOfBuying = () => {
  return (
    <section className="min-w-[100vw] bg-primary-50 w-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="container w-full grid grid-cols-1 items-center py-4 lg:grid-cols-2 justify-center relative lg:gap-5 gap-10 lg:w-full lg:p-8">
        <div className="flex flex-col gap-4 lg:gap-8">
          <h3 className="text-secondary-400 text-3xl lg:text-[38px] lg:leading-[57px] font-bold">
            Postopek nakupa
          </h3>
          <p>
            Pri nas vam omogočamo najti domove, ki ustrezajo vašemu
            življenjskemu slogu in aspiracijam. Odkrijte brezhibno
            nepremičninsko izkušnjo.
          </p>
          <ul className="flex flex-col gap-2 lg:gap-4">
            {listElements.map((element) => (
              <li key={element} className="flex gap-3 lg:gap-5 items-center">
                <CircleCheck
                  width={32}
                  height={32}
                  className="text-primary-200 min-w-8 min-h-8"
                />
                {element}
              </li>
            ))}
          </ul>
          <ButtonWithIcon
            variant="secondary"
            className="text-xl px-6 py-4 max-w-fit">
            Vstopite v stik
          </ButtonWithIcon>
        </div>
        <Image
          src={'/postopek-nakupa.webp'}
          alt="Postopek nakupa"
          width="400"
          height="400"
          className="max-h-[770px] w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default ProccesOfBuying;
