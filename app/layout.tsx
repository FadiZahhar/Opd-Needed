import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OPD Needed',
  description: 'This form is designed to gather detailed information about the specific property you require. By specifying your needs and preferences, we can better assist in finding the ideal property that meets all your criteria.',
  openGraph: {
    title: "OPD DOT VIP",
    description:"Digital Real Estate Marketing",
    emails:'info@propertypro.vip',
    phoneNumbers:'961 3 948 739',
    siteName:"OPD DOT VIP",
    images:'https://firebasestorage.googleapis.com/v0/b/opddev-51cfb.appspot.com/o/hero%2Fhero-img.png?alt=media&token=f57b1b99-9343-41a2-bddd-120378aac3d9',
    url:'https://propertypro.vip/',
    countryName:'Lebanon'
},
  twitter:{
    site:'https://propertypro.vip/',
    creator:"OPD DOT VIP",
    description:'Digital Real Estate Marketing',
    title: "OPD DOT VIP",
    images:'https://firebasestorage.googleapis.com/v0/b/opddev-51cfb.appspot.com/o/hero%2Fhero-img.png?alt=media&token=f57b1b99-9343-41a2-bddd-120378aac3d9',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
