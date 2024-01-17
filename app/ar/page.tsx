import FormAr from '@/components/formar'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'OPD Needed',
  description: 'تم تصميم هذا النموذج لجمع معلومات تفصيلية حول العقار المحدد الذي تحتاجه. من خلال تحديد احتياجاتك وتفضيلاتك، يمكننا مساعدتك بشكل أفضل في العثور على العقار المثالي الذي يلبي جميع معاييرك',
  icons:'https://opd-needed.vercel.app/propertypro.svg',
  openGraph: {
    title: "OPD DOT VIP",
    description:"التسويق العقاري الرقمي",
    emails:'info@propertypro.vip',
    phoneNumbers:'961 3 948 739',
    siteName:"OPD DOT VIP",
    images:'https://opd-needed.vercel.app/hero-img.jpg',
    url:'https://propertypro.vip/',
    countryName:'لبنان'
},
  twitter:{
    site:'https://propertypro.vip/',
    creator:"OPD DOT VIP",
    description:'التسويق العقاري الرقمي',
    title: "OPD DOT VIP",
    images:'https://opd-needed.vercel.app/hero-img.jpg',
  }
}

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1>Under Construction</h1>
      </div>
    </section>
  )
}
