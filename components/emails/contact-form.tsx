import { Body,
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

interface ContactFormEmailProps {
  name: string
  surname: string
  email: string
  message: string
}

export const ContactFormEmail = ({
  name,
  surname,
  email,
  message,
}: ContactFormEmailProps) => {
  const previewText = `Novo sporočilo od ${name} ${surname}`

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
                Novo sporočilo s kontaktnega obrazca
              </Heading>

              <Text className="mb-4 text-gray-700">
                Prejeli ste novo sporočilo preko spletnega kontaktnega obrazca:
              </Text>

              <Section className="mb-6 rounded-lg bg-gray-50 p-4">
                <Text className="mb-2 text-gray-700">
                  <strong>Ime:</strong> {name}
                </Text>
                <Text className="mb-2 text-gray-700">
                  <strong>Priimek:</strong> {surname}
                </Text>
                <Text className="mb-2 text-gray-700">
                  <strong>Email:</strong>{' '}
                  <Link href={`mailto:${email}`} className="text-black underline">
                    {email}
                  </Link>
                </Text>
                <Hr className="my-4 border-gray-200" />
                <Text className="text-gray-700">
                  <strong>Sporočilo:</strong>
                </Text>
                <Text className="whitespace-pre-wrap text-gray-700">{message}</Text>
              </Section>

              <Text className="text-sm text-gray-600">
                Za odgovor uporabniku kliknite na njihov email naslov zgoraj ali
                odgovorite na to sporočilo.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center">
              <Text className="text-xs text-gray-500">
                © {new Date().getFullYear()} Gradnje Plus. Vse pravice pridržane.
              </Text>
              <Text className="mt-2 text-xs text-gray-400">
                To sporočilo je bilo poslano preko kontaktnega obrazca na{' '}
                <Link
                  href="https://gradnjeplus.com"
                  className="text-black underline"
                >
                  gradnjeplus.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
