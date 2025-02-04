import React from 'react'

export default function Zasebnost() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Politika zasebnosti</h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-2xl font-semibold">1. Zbiranje osebnih podatkov</h2>
          <p>Zbiramo naslednje osebne podatke:</p>
          <ul className="ml-6 mt-2 list-disc">
            <li>Ime in priimek</li>
            <li>Kontaktni podatki (e-pošta, telefonska številka)</li>
            <li>Naslov</li>
            <li>Podatki o nepremičninskih preferencah</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">2. Namen obdelave</h2>
          <p>Vaše osebne podatke obdelujemo za naslednje namene:</p>
          <ul className="ml-6 mt-2 list-disc">
            <li>Izvajanje nepremičninskih storitev</li>
            <li>Komunikacija z uporabniki</li>
            <li>Izboljšanje uporabniške izkušnje</li>
            <li>Zakonske obveznosti</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">3. Pravna podlaga</h2>
          <p>Osebne podatke obdelujemo na podlagi:</p>
          <ul className="ml-6 mt-2 list-disc">
            <li>Privolitve posameznika</li>
            <li>Izvajanja pogodbe</li>
            <li>Zakonskih obveznosti</li>
            <li>Zakonitih interesov upravljavca</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">4. Hramba podatkov</h2>
          <p>
            Osebne podatke hranimo le toliko časa, kolikor je potrebno za namen, zaradi katerega
            so bili zbrani, oz. do preklica privolitve posameznika. Po preteku tega obdobja podatke
            varno izbrišemo ali anonimiziramo.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">5. Pravice posameznikov</h2>
          <p>Kot posameznik imate naslednje pravice:</p>
          <ul className="ml-6 mt-2 list-disc">
            <li>Pravica do dostopa do podatkov</li>
            <li>Pravica do popravka</li>
            <li>Pravica do izbrisa (&quot;pravica do pozabe&quot;)</li>
            <li>Pravica do omejitve obdelave</li>
            <li>Pravica do prenosljivosti podatkov</li>
            <li>Pravica do ugovora</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">6. Piškotki</h2>
          <p>
            Naša spletna stran uporablja piškotke za izboljšanje uporabniške izkušnje. Več
            informacij o piškotkih in njihovem upravljanju najdete v naši Politiki piškotkov.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">7. Varnost podatkov</h2>
          <p>
            Implementirali smo ustrezne tehnične in organizacijske ukrepe za zaščito vaših osebnih
            podatkov pred nepooblaščenim dostopom, izgubo ali zlorabo.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">8. Kontaktni podatki</h2>
          <p>Za vsa vprašanja glede zasebnosti se lahko obrnete na:</p>
          <p className="mt-2">[KONTAKTNI PODATKI PODJETJA IN POOBLAŠČENE OSEBE ZA VARSTVO PODATKOV]</p>
        </section>
      </div>
    </div>
  )
}
