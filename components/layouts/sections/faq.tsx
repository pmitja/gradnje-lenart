import { MinusIcon, PlusIcon } from 'lucide-react'

import ButtonWithIcon from '@/components/common/button-with-icon'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PublicKontakt } from '@/routes'

const Faq = () => (
  <section className="py-16 md:py-24" id="faq">
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-secondary-300 md:text-3xl lg:text-4xl">
        Pogosta vprašanja
      </h2>
      <div className="mx-auto h-1 w-16 bg-primary-200"></div>
    </div>

    <div className="mx-auto max-w-5xl">
      <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
        <AccordionItem
          value="item-1"
          className="overflow-hidden rounded-md border border-secondary-50"
        >
          <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-secondary-300 transition-colors duration-200 hover:text-primary-300">
            <span className="text-left font-medium">Kako poteka postopek nakupa nepremičnine?</span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-secondary-50 px-6 py-4 font-archivo text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja tvorijo osnovne korake
            v postopku nakupa nepremičnine. Predhodna odobritev kredita in posvet s strokovnjakom
            sta ključna. Oddana ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="overflow-hidden rounded-md border border-secondary-50"
        >
          <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-secondary-300 transition-colors duration-200 hover:text-primary-300">
            <span className="text-left font-medium">
              Kakšne so možnosti financiranja pri nakupu nepremičnine?
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-secondary-50 px-6 py-4 font-archivo text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja tvorijo osnovne korake
            v postopku nakupa nepremičnine. Predhodna odobritev kredita in posvet s strokovnjakom
            sta ključna. Oddana ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="overflow-hidden rounded-md border border-secondary-50"
        >
          <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-secondary-300 transition-colors duration-200 hover:text-primary-300">
            <span className="text-left font-medium">
              Ali je mogoče dobiti ogled nepremičnine pred nakupom?
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-secondary-50 px-6 py-4 font-archivo text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja tvorijo osnovne korake
            v postopku nakupa nepremičnine. Predhodna odobritev kredita in posvet s strokovnjakom
            sta ključna. Oddana ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="overflow-hidden rounded-md border border-secondary-50"
        >
          <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-secondary-300 transition-colors duration-200 hover:text-primary-300">
            <span className="text-left font-medium">
              Kaj vključujejo stroški povezani z nakupom nepremičnine?
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-secondary-50 px-6 py-4 font-archivo text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja tvorijo osnovne korake
            v postopku nakupa nepremičnine. Predhodna odobritev kredita in posvet s strokovnjakom
            sta ključna. Oddana ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="overflow-hidden rounded-md border border-secondary-50"
        >
          <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-secondary-300 transition-colors duration-200 hover:text-primary-300">
            <span className="text-left font-medium">
              Kako je z vzdrževanjem skupnih prostorov v večstanovanjskih stavbah?
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-secondary-50 px-6 py-4 font-archivo text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja tvorijo osnovne korake
            v postopku nakupa nepremičnine. Predhodna odobritev kredita in posvet s strokovnjakom
            sta ključna. Oddana ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-6"
          className="overflow-hidden rounded-md border border-secondary-50"
        >
          <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-secondary-300 transition-colors duration-200 hover:text-primary-300">
            <span className="text-left font-medium">
              Kako se ukvarjate z morebitnimi težavami v soseski, na primer glede hrupa ali
              parkiranja?
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-secondary-50 px-6 py-4 font-archivo text-secondary-200">
            Iskanje, ogled, finančno načrtovanje, oddaja ponudbe in pogajanja tvorijo osnovne korake
            v postopku nakupa nepremičnine. Predhodna odobritev kredita in posvet s strokovnjakom
            sta ključna. Oddana ponudba pripelje do dogovora in nakupa. Za več informacij smo na
            voljo.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-12 text-center">
        <p className="mb-6 font-archivo text-secondary-200">
          Ne najdete odgovora na vaše vprašanje? Kontaktirajte nas.
        </p>
        <PublicKontakt.Link>
          <ButtonWithIcon
            variant={'secondary'}
            className="mx-auto transition-all duration-300 hover:bg-secondary-100"
          >
            Vstopite v stik z nami
          </ButtonWithIcon>
        </PublicKontakt.Link>
      </div>
    </div>
  </section>
)

export default Faq
