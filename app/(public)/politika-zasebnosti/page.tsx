import React from 'react'

export default function Zasebnost() {
  return (
    <div className="pt-4 md:pt-[160px]">
      <h1 className="mb-6 text-3xl font-bold">Politika zasebnosti</h1>
      <p className="mb-6 text-sm text-gray-600">Zadnja posodobitev: {new Date().toLocaleDateString('sl-SI')}</p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-2xl font-semibold">1. Upravljavec osebnih podatkov</h2>
          <p>
            Gradnje Plus d.o.o., Partizanska cesta 14, 2230 Lenart v Slovenskih goricah, je upravljavec vaših osebnih podatkov. 
            Za vsa vprašanja v zvezi z vašimi osebnimi podatki nas lahko kontaktirate na info@gradnje-plus.si ali 041 638 451.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">2. Katere osebne podatke zbiramo</h2>
          <p>Pri poslovanju z nami zbiramo naslednje kategorije osebnih podatkov:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li><strong>Osnovni identifikacijski podatki:</strong> ime, priimek, naslov stalnega/začasnega prebivališča, EMŠO, davčna številka</li>
            <li><strong>Kontaktni podatki:</strong> e-poštni naslov, telefonska številka</li>
            <li><strong>Podatki o nepremičnini:</strong> informacije o nepremičnini, za katero ste izrazili interes</li>
            <li><strong>Podatki o rezervaciji:</strong> datum rezervacije, trajanje, posebne zahteve</li>
            <li><strong>Finančni podatki:</strong> podatki o plačilu, bančni podatki (v primeru vračila)</li>
            <li><strong>Komunikacija:</strong> vsebina vaše komunikacije z nami</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">3. Namen obdelave osebnih podatkov</h2>
          <p>Vaše osebne podatke obdelujemo za naslednje namene:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li><strong>Izvedba rezervacije nepremičnine:</strong> obdelava vaše rezervacije, zagotavljanje storitev v zvezi z rezervacijo</li>
            <li><strong>Izpolnjevanje pogodbenih obveznosti:</strong> ko enkrat rezervirate ali kupite nepremičnino, vaše podatke uporabljamo za izpolnitev naše pogodbene obveznosti do vas</li>
            <li><strong>Zakonske obveznosti:</strong> izpolnjevanje obveznosti po veljavni zakonodaji (računovodstvo, davki, poročanje regulatorjem)</li>
            <li><strong>Komunikacija:</strong> odgovarjanje na vaša vprašanja, zahteve in povratne informacije</li>
            <li><strong>Izvedba nakupa nepremičnine:</strong> priprava in sklenitev prodajne pogodbe ter drugih pravnih dokumentov</li>
            <li><strong>Upravljanje s strankami:</strong> vzdrževanje točnih podatkov o strankah v naši bazi podatkov</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">4. Pravna podlaga za obdelavo</h2>
          <p>Vaše osebne podatke obdelujemo na podlagi:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li><strong>Izvajanje pogodbe:</strong> ko rezervirate nepremičnino, obdelujemo vaše podatke, da lahko izpolnimo pogodbo z vami</li>
            <li><strong>Zakonska obveznost:</strong> kadar moramo vaše podatke obdelovati zaradi izpolnjevanja zakonskih obveznosti (npr. davčna zakonodaja)</li>
            <li><strong>Zakoniti interes:</strong> kadar je to potrebno za namene zakonitih interesov, ki jih zasledujemo mi ali tretja oseba, razen kadar nad takimi interesi prevladajo vaši interesi ali temeljne pravice in svoboščine</li>
            <li><strong>Privolitev:</strong> v določenih primerih lahko zahtevamo vašo izrecno privolitev za obdelavo vaših osebnih podatkov</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">5. Obdobje hrambe podatkov</h2>
          <p>Vaše osebne podatke hranimo samo toliko časa, kolikor je potrebno za namene, za katere smo jih zbrali:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li><strong>Podatki o rezervaciji:</strong> hranimo jih do zaključka rezervacijskega procesa. V primeru preklica rezervacije ali neprodane nepremičnine, podatke izbrišemo v roku 30 dni po zaključku rezervacije.</li>
            <li><strong>Podatki o nakupu nepremičnine:</strong> če rezervirana nepremičnina postane predmet nakupa, podatke o stranki hranimo skupaj s podatki o nepremičnini za čas lastništva nepremičnine in dodatno obdobje 10 let po prodaji zaradi zakonskih zahtev (računovodska in davčna zakonodaja).</li>
            <li><strong>Podatki za davčne namene:</strong> v skladu z davčno zakonodajo hranimo določene podatke 10 let.</li>
            <li><strong>Komunikacija s strankami:</strong> hranimo 3 leta po zadnji komunikaciji.</li>
          </ul>
          <p className="mt-2">
            Po preteku obdobja hrambe podatke varno in trajno izbrišemo ali anonimiziramo, tako da jih ni več mogoče povezati z določenim posameznikom.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">6. Deljenje in prenos podatkov</h2>
          <p>
            Vaše osebne podatke lahko razkrijemo naslednjim kategorijam prejemnikov:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li><strong>Ponudniki storitev:</strong> zunanja podjetja, ki nam pomagajo pri izvajanju naših storitev (npr. ponudniki IT storitev, računovodski servisi)</li>
            <li><strong>Notarji in pravni svetovalci:</strong> za pripravo in izvedbo pravnih dokumentov pri prodaji nepremičnin</li>
            <li><strong>Državni organi:</strong> kjer to zahteva zakon (npr. davčna uprava, sodišča)</li>
            <li><strong>Finančne institucije:</strong> banke in drugi finančni posredniki za izvedbo plačil</li>
          </ul>
          <p className="mt-2">
            Z vsemi zunanjimi ponudniki storitev, ki imajo dostop do vaših osebnih podatkov, imamo sklenjene ustrezne pogodbe o obdelavi podatkov, ki zagotavljajo, da vaše podatke obdelujejo v skladu z veljavno zakonodajo o varstvu podatkov.
          </p>
          <p className="mt-2">
            Vaših osebnih podatkov ne prenašamo v tretje države izven Evropskega gospodarskega prostora (EGP), razen če je to nujno potrebno za izpolnitev naših pogodbenih obveznosti do vas in če obstajajo ustrezni zaščitni ukrepi v skladu z GDPR.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">7. Vaše pravice</h2>
          <p>V skladu z GDPR imate naslednje pravice v zvezi z vašimi osebnimi podatki:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li><strong>Pravica do dostopa:</strong> pravica, da od nas dobite potrditev, ali se v zvezi z vami obdelujejo osebni podatki, in če je tako, dostop do teh podatkov</li>
            <li><strong>Pravica do popravka:</strong> pravica zahtevati popravek netočnih osebnih podatkov in dopolnitev nepopolnih osebnih podatkov</li>
            <li><strong>Pravica do izbrisa (pravica do pozabe):</strong> pravica zahtevati izbris vaših osebnih podatkov v določenih okoliščinah</li>
            <li><strong>Pravica do omejitve obdelave:</strong> pravica zahtevati omejitev obdelave vaših osebnih podatkov</li>
            <li><strong>Pravica do prenosljivosti podatkov:</strong> pravica prejeti vaše osebne podatke v strukturirani, splošno uporabljani in strojno berljivi obliki ter prenesti te podatke drugemu upravljavcu</li>
            <li><strong>Pravica do ugovora:</strong> pravica do ugovora obdelavi vaših osebnih podatkov, kadar se obdelava izvaja na podlagi zakonitega interesa</li>
            <li><strong>Pravica do preklica privolitve:</strong> če obdelava temelji na privolitvi, imate pravico kadarkoli preklicati privolitev, ne da bi to vplivalo na zakonitost obdelave na podlagi privolitve pred njenim preklicem</li>
          </ul>
          <p className="mt-2">
            Za uveljavljanje katerekoli od teh pravic nas kontaktirajte na info@gradnje-plus.si. Na vašo zahtevo bomo odgovorili v enem mesecu, v primeru kompleksnosti ali večjega števila zahtev pa lahko ta rok podaljšamo za največ dva dodatna meseca.
          </p>
          <p className="mt-2">
            Če menite, da naša obdelava vaših osebnih podatkov krši določbe GDPR, imate pravico vložiti pritožbo pri Informacijskem pooblaščencu, Dunajska cesta 22, 1000 Ljubljana, telefon: 01 230 97 30, e-pošta: gp.ip@ip-rs.si.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">8. Varnostni ukrepi</h2>
          <p>
            Implementirali smo ustrezne tehnične in organizacijske ukrepe za zaščito vaših osebnih podatkov pred naključno ali nezakonito izgubo, dostopom, razkritjem, spremembo ali uničenjem. Ti ukrepi vključujejo:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Šifriranje podatkov</li>
            <li>Redne varnostne preglede in posodobitve sistemov</li>
            <li>Omejen dostop do osebnih podatkov samo pooblaščenim osebam</li>
            <li>Stroge zahteve glede zaupnosti za naše zaposlene in pogodbene partnerje</li>
            <li>Postopke za redno testiranje, ocenjevanje in vrednotenje učinkovitosti varnostnih ukrepov</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">9. Piškotki in podobne tehnologije</h2>
          <p>
            Naša spletna stran uporablja piškotke in podobne tehnologije za izboljšanje vaše uporabniške izkušnje, analizo uporabe spletne strani in zagotavljanje prilagojenih vsebin. Več informacij o tem, kako uporabljamo piškotke, najdete v naši Politiki piškotkov.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">10. Spremembe politike zasebnosti</h2>
          <p>
            To politiko zasebnosti lahko občasno posodobimo, da odraža spremembe v naših praksah obdelave podatkov ali spremembe v zakonodaji. Posodobljeno politiko bomo objavili na tej strani z osveženim datumom zadnje posodobitve. Priporočamo, da redno preverjate to stran za morebitne spremembe.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">11. Kontaktni podatki</h2>
          <p>Za vsa vprašanja ali zahteve glede zasebnosti se lahko obrnete na:</p>
          <div className="mt-3 space-y-1">
            <p><strong>Gradnje Plus d.o.o.</strong></p>
            <p>Partizanska cesta 14, 2230 Lenart v Slovenskih goricah</p>
            <p>Telefon: 041 638 451</p>
            <p>E-pošta: info@gradnje-plus.si</p>
          </div>
        </section>
      </div>
    </div>
  )
}
