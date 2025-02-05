import { Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text } from '@react-email/components'

interface PropertyNotificationEmailProps {
  realEstateName: string
  propertyUrl: string
  recipientEmail?: string
}

export const PropertyNotificationEmail = ({
  realEstateName,
  propertyUrl,
  recipientEmail,
}: PropertyNotificationEmailProps) => {
  const previewText = `${realEstateName} je zdaj na voljo!`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8">
            {/* Logo */}
            <Section className="mb-6 text-center">
              <img
                src="https://gradnjeplus.com/gradnje-plus-logo.webp"
                alt="Gradnje Plus"
                className="h-8"
              />
            </Section>

            {/* Main Content */}
            <Section className="rounded-lg border border-solid border-gray-200 bg-white p-8">
              <Heading className="mb-6 text-2xl font-bold text-gray-800">
                Vaša želena nepremičnina je zdaj na voljo!
              </Heading>

              <Text className="mb-4 text-gray-700">
                Spoštovani,
              </Text>

              <Text className="mb-4 text-gray-700">
                Z veseljem vas obveščamo, da je nepremičnina{' '}
                <strong>{realEstateName}</strong>, za katero ste izrazili
                zanimanje, zdaj na voljo za ogled in rezervacijo.
              </Text>

              <Text className="mb-6 text-gray-700">
                Glede na veliko zanimanje za to nepremičnino vam priporočamo, da
                si jo čim prej ogledate in se odločite o nakupu.
              </Text>

              <Button
                className="rounded-full bg-black px-6 py-3 text-center text-white"
                href={propertyUrl}
              >
                Oglejte si nepremičnino →
              </Button>

              <Hr className="my-6 border-gray-200" />

              <Text className="mb-4 text-sm text-gray-600">
                Za dodatne informacije ali vprašanja smo vam na voljo:
              </Text>

              <Text className="mb-4 text-sm text-gray-600">
                • Email:{' '}
                <Link
                  href="mailto:info@gradnjeplus.com"
                  className="text-black underline"
                >
                  info@gradnjeplus.com
                </Link>
                <br />
                • Telefon:{' '}
                <Link href="tel:+38640777777" className="text-black underline">
                  +386 40 777 777
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center">
              <Text className="text-xs text-gray-500">
                © {new Date().getFullYear()} Gradnje Plus. Vse pravice pridržane.
              </Text>
              {recipientEmail && (
                <Text className="mt-2 text-xs text-gray-400">
                  Prejeli ste to sporočilo, ker ste se prijavili na obvestila za
                  to nepremičnino z emailom {recipientEmail}.{' '}
                  <Link
                    href="https://gradnjeplus.com/odjava"
                    className="text-black underline"
                  >
                    Odjava od obvestil
                  </Link>
                </Text>
              )}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
