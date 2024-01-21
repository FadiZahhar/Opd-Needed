import { z } from 'zod'

export const FormDataSchema = z.object({
  FirstName: z.string().min(1, 'اسمك مطلوب'),
  LastName: z.string().min(1, 'مطلوب اسمك الأخير'),
  Email: z.string().min(1, 'البريد الالكتروني مطلوب').email('عنوان البريد الإلكتروني غير صالح'),
  PhoneNumber: z.string().min(1, 'رقم هاتفك مطلوب'),
  LikeTo: z.string().min(1, 'هذه الخانة مطلوبه'),
  SpecifyType: z.string().min(1, 'النوع مطلوب'),
  SpecifyRegion: z.string().min(1, 'المنطقة مطلوبة'),
  Country: z.string().min(1, 'الدولة مطلوبة'),
  District: z.string().min(1, 'المنطقة مطلوبة'),
  GovernateOrState : z.string().min(1, ' يجب ملء الحقل محافظة أو ولاية'),
  Financials: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  MaximumPricePerSquareMetre: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  LandClassification: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  MoreDetails: z.array(z.string()),
  OtherMoreDetails : z.string(),
  MaximumOverallInvestmentZone: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  NatureAndLocation: z.string().min(1,'هذا الحقل مطلوب'),
  OtherNatureAndLocation : z.string(),
  IsItNearA: z.array(z.string()),
  OtherIsItNearA : z.string(),
  IsItPossibleTo: z.array(z.string()),
  DoesAnyoneHaveARight : z.array(z.string()),
  OtherDoesAnyoneHaveARight : z.string(),
  honeypot: z.string()
})
