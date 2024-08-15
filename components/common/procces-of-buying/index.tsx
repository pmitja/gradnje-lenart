import { CircleCheck } from 'lucide-react'
import ButtonWithIcon from '../button-with-icon'
import Image from 'next/image'

const listElements = [
  'Najdi svoje sanjsko stanovanje',
  'Dogovori se za ogled in pridobi vse ostale potrebne informacije',
  'Ogled je namenjen razščiščevanju ne jasnosti iz oglasa',
  'Svetovanje, glede potreb in finančna zmogljivost',
  'Sestava pogodbe in pregled pogodbe',
  'Podpis pogodbe',
  'Predaja nepremičnine in vselitev'
]

const ProccesOfBuying = () => {
  return (
    <section className='relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-[100vw] min-w-[100vw] bg-primary-50'>
      <div className='container relative grid w-full grid-cols-1 items-center justify-center gap-10 py-4 lg:w-full lg:grid-cols-2 lg:gap-5 lg:p-8'>
        <div className='flex flex-col gap-4 lg:gap-8'>
          <h3 className='text-3xl font-bold text-secondary-400 lg:text-[38px] lg:leading-[57px]'>
            Postopek nakupa
          </h3>
          <p className='text-sm text-secondary-100 lg:text-base'>
            Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu slogu in
            aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo.
          </p>
          <ul className='flex flex-col gap-2 lg:gap-4'>
            {listElements.map((element) => (
              <li
                key={element}
                className='flex items-center gap-3 lg:gap-5'
              >
                <CircleCheck
                  width={32}
                  height={32}
                  className='min-h-8 min-w-8 text-primary-200'
                />
                {element}
              </li>
            ))}
          </ul>
          <ButtonWithIcon
            variant='secondary'
            className='max-w-fit px-6 py-4 text-xl'
          >
            Vstopite v stik
          </ButtonWithIcon>
        </div>
        <Image
          src={'/postopek-nakupa.webp'}
          alt='Postopek nakupa'
          width='400'
          height='400'
          className='h-full max-h-[770px] w-full object-contain'
        />
      </div>
    </section>
  )
}

export default ProccesOfBuying
