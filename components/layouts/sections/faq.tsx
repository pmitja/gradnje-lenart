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
            Oglejte si prosta stanovanja na spletni strani ali se oglasite v naših poslovnih
            prostorih na Partizanski cesti 14, 2230 Leanrt v Slovenskih goricah. Opravite brezplačno
            rezervacijo stanovanja za 14 dni. Po sprejemu odločitve o nakupu se podpiše predpogodba
            za nakup stanovanja in vplača ara v vrednosti 10%. Preostalih 90% vrednosti stanovanja
            se plača po podpisani prodajni pogodbi in pred prevzemom stanovanja.
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
            Skupaj s poslovnim partnerjem NLB se trudimo iskati najugodnejše rešitve financiranja
            tudi za naše stranke.
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
            V primeru da je nepremičnina že zgrajena je seveda mogoč ogled le te. Če je novogradnja
            še v teku pa vam zagotovimo kar se da realne vizualizacije stanovanj.
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
            Stroški vključujejo nepremičnino z vsemi pripadajočimi deli izvedeno do dogovorjene faze
            ob podpisu predpogodbe za nakup.
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
            Projekti oz. novogradnje so že v času projektiranja zasnovani in kasneje tudi
            preizkušeni da dosegajo vse standarde zvočne izoliranosti. Vedno poskrbimo tudi za
            zadostno število razpoložljivih parkirišč, glede na potrebe modernega življenja.
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
