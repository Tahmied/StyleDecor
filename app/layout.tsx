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
  metadataBase: new URL('https://style-decor.vercel.app'),
  title: {
    template: '%s | StyleDecor',
    default: 'StyleDecor - Premium Event Decoration',
  },
  openGraph: {
    title: 'StyleDecor - Premium Event Decoration',
    description: 'Book the best event decorators for weddings, birthdays, and corporate events.',
    url: 'https://style-decor.vercel.app',
    siteName: 'StyleDecor',
    images: [
      {
        url: 'https://res.cloudinary.com/dp17s655f/image/upload/v1766049155/Furniture_iedxay.png',
        width: 1200,
        height: 630,
        alt: 'StyleDecor Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
    icons: {
      icon: '/icon.png'
    }
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
