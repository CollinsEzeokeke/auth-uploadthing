import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  text: string;
}

export const EmailVerification: React.FC<VerificationEmailProps> = ({
  text,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address to get started shopping</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4">
            {/* Header Section */}
            <Section className="bg-white rounded-t-lg p-8 shadow-lg">
              <Heading className="text-3xl font-bold text-center text-purple-600 mb-4">
                Welcome to ShopSmart!
              </Heading>
              
              {/* Logo Placeholder */}
              <div className="text-center mb-8">
                <Img
                  src="https://your-logo-url.com/logo.png"
                  alt="ShopSmart Logo"
                  className="mx-auto w-24 h-24"
                />
              </div>

              {/* Main Content */}
              <Text className="text-gray-700 text-lg mb-6">
                We're excited to have you join our community of smart shoppers! 
                To get started with your shopping journey, please verify your email address.
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-8">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 inline-block px-8 py-4 rounded-full text-white font-bold text-lg transition-colors duration-200"
                  href={text}
                >
                  Verify Email Address
                </Button>
              </Section>

              {/* Security Note */}
              <Text className="text-sm text-gray-600 mb-4">
                For security reasons, this verification link will expire in 24 hours.
                If you didn't create an account with ShopSmart, please ignore this email.
              </Text>
            </Section>

            {/* Features Section */}
            <Section className="bg-white rounded-b-lg p-8 shadow-lg mt-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4">
                  <Text className="font-semibold text-purple-600 mb-2">
                    Exclusive Deals
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Get access to member-only discounts
                  </Text>
                </div>
                <div className="text-center p-4">
                  <Text className="font-semibold text-purple-600 mb-2">
                    Fast Delivery
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Premium shipping options available
                  </Text>
                </div>
              </div>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center">
              <Text className="text-xs text-gray-500">
                © 2024 ShopSmart. All rights reserved.
              </Text>
              <Text className="text-xs text-gray-500 mt-2">
                If you have any questions, contact our support team at{' '}
                <Link
                  href="mailto:support@shopsmartapp.com"
                  className="text-purple-600 underline"
                >
                  support@shopsmartapp.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};




// email sender function 
interface sendEmailProps {
    to: string,
    subject: string,
    text: string
}
import resend from './resendClient';

export const sendEmail = async ({ to, subject, text }: sendEmailProps) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Chiflex <onboarding@resend.dev>",
            to: to,
            subject: subject,
            react: EmailVerification({ text }),
        })
        if(data){
            console.log(data)
        }
        if (error){
            console.log(error)
        }
        console.log('Sending email to', to)
        return {success: true}
    } catch (error) {
        console.log('Error sending email:', error)
        throw error
    }
}