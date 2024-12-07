import React from 'react';
import { Html, Head, Body, Container, Section, Text, Button, Link, Img, Column, Row } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export function PasswordReset(text: string) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 py-12 px-4 font-sans">
          <Container className="max-w-md mx-auto">
            <Section className="bg-white p-8 rounded-lg shadow space-y-8">
              {/* Logo */}
              <Container className="text-2xl font-bold text-gray-500 text-center">
                <Row className='w-[15vh]'>
                  <Column><Text className="text-gray-400 font-bold text-3xl">A</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">U</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">T</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">H</Text></Column>
                  <Column className='flex justify-center flex-row '><Text className="text-blue-500 text-3xl font-bold">-</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">U</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">P</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">L</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">O</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">A</Text></Column>
                  <Column><Text className="text-gray-400 font-bold text-3xl">D</Text></Column>
                </Row>
              </Container>

              {/* Icon */}
              <Section className="text-center">
                <Row>
                  <Column align="center">
                    <Container style={{
                      position: 'relative',
                      width: '96px',
                      height: '96px',
                      margin: '0 auto',
                    }}>
                      {/* Cyan Square */}
                      <Container style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}>
                        <Container style={{
                          width: '64px',
                          height: '64px',
                          backgroundColor: '#22D3EE',
                          borderRadius: '8px',
                          transform: 'rotate(45deg)',
                        }} />
                      </Container>

                      {/* Gradient Circle */}
                      <Container style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}>
                        <Container style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(to right, #EC4899, #A855F7)',
                          borderRadius: '50%',
                        }} />
                      </Container>

                      {/* Yellow Square */}
                      <Container style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                      }}>
                        <Container style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#FACC15',
                          transform: 'rotate(12deg)',
                        }} />
                      </Container>
                    </Container>
                  </Column>
                </Row>
              </Section>

              <Section className="space-y-6">
                <Text className="text-3xl font-bold text-center text-gray-800 font-sans">
                  Reset your password
                </Text>

                <Text className="text-center text-gray-600 font-sans">
                  We&apos;ve got a request from you to reset the password for your account. Please click on the button below to get a new password
                </Text>
                <Container className='flex justify-center'>
                  <Button
                    href={text}
                    className="w-[20vw] py-3 px-4 bg-[#3b5998] text-white rounded-md text-center inline-block font-medium"
                  >
                    Reset my password
                  </Button>
                </Container>

              </Section>

              {/* Questions Section */}
              <Section className="space-y-4 pt-6">
                <Text className="font-medium text-gray-800">Questions?</Text>
                <Text className="text-sm text-gray-600">
                  Please let us know if there&apos;s anything we can help you with by replying to this email or by emailing{' '}
                  <Link href="mailto:help@auth-upload.com/email" className="text-blue-600 hover:underline">
                    help@auth-upload.com/email
                  </Link>
                  .
                </Text>
                <Text className="text-sm text-gray-600">
                  If you didn&apos;t request a password reset, we recommend you get in touch with our support team and secure your account.
                </Text>
                <Text className="text-sm text-gray-600">
                  Call us at{' '}
                  <Link href="tel:1(877-576-8789)" className="text-blue-600 hover:underline">
                    1(877-576-8789)
                  </Link>{' '}
                  or write to us at{' '}
                  <Link href="mailto:help@auth-upload.com/company" className="text-blue-600 hover:underline">
                    help@auth-upload.com/company
                  </Link>
                </Text>
              </Section>
              {/* Social Links */}
              <Section className="pt-8 flex justify-center items-center mt-[-2vh] space-x-6 flex-row w-[20vw]">
                <Row className="flex justify-center">
                  <Column className="px-2">
                    <Link href="#" className="text-[#3b5998]">
                      <Img
                        src="https://utfs.io/f/EyRmrLuwyQI1GhOLPF9LFmlrUIxKhPHVNJ2Ycos1SeAX7qGa"
                        width="24"
                        height="24"
                        alt="Facebook"
                      />
                    </Link>
                  </Column>
                  <Column className="px-2">
                    <Link href="#" className="text-pink-500">
                      <Img
                        src="https://utfs.io/f/EyRmrLuwyQI1TNCPRWxyC7NLjqoZ5KkFUYtmxWpGBrOsAlfc"
                        width="24"
                        height="24"
                        alt="Instagram"
                      />
                    </Link>
                  </Column>
                  <Column className="px-2">
                    <Link href="#" className="text-blue-400">
                      <Img
                        src="https://utfs.io/f/EyRmrLuwyQI1GIcWm69LFmlrUIxKhPHVNJ2Ycos1SeAX7qGa"
                        width="24"
                        height="24"
                        alt="Twitter"
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>

              {/* Footer */}
              <Section className="pt-8 text-center">
                <Text className="text-sm text-gray-500">Copyright © 2022 | Company | All rights reserved</Text>
                <Text className="text-sm text-gray-400 mt-2">
                  Unsubscribe • by Auth-upload
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

interface sendEmailProps {
  to: string,
  subject: string,
  text: string
}
import resend from './resendClient';

export const ResetEmail = async ({ to, subject, text }: sendEmailProps) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "AuthUpload <onboarding@resend.dev>",
      to: to,
      subject: subject,
      react: PasswordReset(text),
    })
    if (data) {
      console.log(data)
    }
    if (error) {
      console.log(error)
    }
    console.log('Sending email to', to)
    return { success: true }
  } catch (error) {
    console.log('Error sending email:', error)
    throw error
  }
}

export default ResetEmail