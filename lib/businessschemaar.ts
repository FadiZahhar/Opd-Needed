import { z } from 'zod'

export const FormDataSchema = z.object({
  FirstName: z.string().min(1, 'اسمك مطلوب'),
  LastName: z.string().min(1, 'اسمك الأخير مطلوب'),
  Email: z.string().min(1, 'البريد الالكتروني مطلوب').email('عنوان البريد الإلكتروني غير صالح'),
  PhoneNumber: z.string().min(1, 'رقم هاتفك مطلوب'),
  LikeTo: z.string().min(1, 'هذه الخانة مطلوبه'),
  SpecifyType: z.string().min(1, 'النوع مطلوب'),
  SpecifyRegion: z.string().min(1, 'المنطقة مطلوبة'),
  Country: z.string().min(1, 'الدولة مطلوبة'),
  District: z.string().min(1, 'المنطقة مطلوبة'),
  GovernateOrState : z.string().min(1, 'مطلوب المحافظة أو الولاية'),
  Financials: z.string().min(1,'حقله مطلوب، يرجى وضع 0 كحد أدنى للقيمة'),
  NatureAndLocation: z.string().min(1,'هذه الخانة مطلوبه'),
  CeilingHeightInMeters: z.string().min(1,'هذا الحقل مطلوب، يرجى وضع 0 كحد أدنى للقيمة'),
  AreaDesiredInSqm: z.string().min(1,'هذا الحقل مطلوب، يرجى وضع 0 كحد أدنى للقيمة'),
  Lounge: z.boolean(),
  WaitingRoom : z.boolean(),
  Bathrooms: z.boolean(),
  Office: z.boolean(),
  SecretaryOffice: z.boolean(),
  Reception: z.boolean(),
  OtherAreaAndFacilities : z.string(),
  WidthOfEntranceInMeters: z.string().min(1,'هذا الحقل مطلوب، يرجى وضع 0 كحد أدنى للقيمة'),
  Ramp : z.boolean(),
  Stairs : z.boolean(),
  Elevator: z.boolean(),
  CommodityElevator: z.boolean(),
  Escalator: z.boolean(),
  OtherDetails:z.string(),
  honeypot: z.string(),
})
