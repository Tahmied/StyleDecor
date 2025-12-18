import Providers from '@/lib/providers';
import { Geist_Mono, Urbanist } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const logoFont = localFont({
  src: [
    {
      path: '../public/fonts/FontsFree-Net-Dream-Avenue.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-logo',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | StyleDecor',
    default: 'StyleDecor - Premium Event Decoration',
  },
  description: 'Book the best event decorators for weddings, birthdays, and corporate events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${geistMono.variable} ${logoFont.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
