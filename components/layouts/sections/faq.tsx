import ButtonWithIcon from '@/components/common/button-with-icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Faq = () => {
  return (
    <section className='flex flex-col lg:flex-row gap-[72px] lg:gap-8 justify-between'>
      <div className="flex flex-col gap-6 basis-1/3">
        <h2 className="text-[51px] leading-[76.5px] font-bold text-secondary-400">
          Pogosta vprašanja
        </h2>
        <p className="font-archivo text-base leading-5 text-secondary-200">
          V tej sekciji prinašamo odgovore na najpogostejša vprašanja, ki se
          pojavljajo med našimi strankami. Če ne najdete odgovora na vaše
          vprašanje, nas prosim kontaktirajte.
        </p>
        <ButtonWithIcon variant={'secondary'} className="w-fit">
          Vstopite v stik z nami
        </ButtonWithIcon>
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue='item-1'
        className="w-full flex flex-col gap-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl leading-6 border-b border-primary-100 py-6">
            Kako poteka postopek nakupa nepremičnine?
          </AccordionTrigger>
          <AccordionContent className="font-archivo text-base leading-5 text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja
            tvorijo osnovne korake v postopku nakupa nepremičnine. Predhodna
            odobritev kredita in posvet s strokovnjakom sta ključna. Oddana
            ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl leading-6 border-b border-primary-100 py-6">
            Kakšne so možnosti financiranja pri nakupu nepremičnine?
          </AccordionTrigger>
          <AccordionContent className="font-archivo text-base leading-5 text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja
            tvorijo osnovne korake v postopku nakupa nepremičnine. Predhodna
            odobritev kredita in posvet s strokovnjakom sta ključna. Oddana
            ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl leading-6 border-b border-primary-100 py-6">
            Ali je mogoče dobiti ogled nepremičnine pred nakupom?
          </AccordionTrigger>
          <AccordionContent className="font-archivo text-base leading-5 text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja
            tvorijo osnovne korake v postopku nakupa nepremičnine. Predhodna
            odobritev kredita in posvet s strokovnjakom sta ključna. Oddana
            ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl leading-6 border-b border-primary-100 py-6">
            Kaj vključujejo stroški povezani z nakupom nepremičnine?
          </AccordionTrigger>
          <AccordionContent className="font-archivo text-base leading-5 text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja
            tvorijo osnovne korake v postopku nakupa nepremičnine. Predhodna
            odobritev kredita in posvet s strokovnjakom sta ključna. Oddana
            ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-xl leading-6 border-b border-primary-100 py-6">
            Kako je z vzdrževanjem skupnih prostorov v večstanovanjskih stavbah?
          </AccordionTrigger>
          <AccordionContent className="font-archivo text-base leading-5 text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja
            tvorijo osnovne korake v postopku nakupa nepremičnine. Predhodna
            odobritev kredita in posvet s strokovnjakom sta ključna. Oddana
            ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-xl leading-6 border-b border-primary-100 py-6">
            Kako se ukvarjate z morebitnimi težavami v soseski, na primer glede
            hrupa ali parkiranja?
          </AccordionTrigger>
          <AccordionContent className="font-archivo text-base leading-5 text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja
            tvorijo osnovne korake v postopku nakupa nepremičnine. Predhodna
            odobritev kredita in posvet s strokovnjakom sta ključna. Oddana
            ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Faq;
