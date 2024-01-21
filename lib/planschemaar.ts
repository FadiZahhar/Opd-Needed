import { z } from 'zod'

export const FormDataSchema = z.object({
  FirstName: z.string().min(1, 'اسمك مطلوب'),
  LastName: z.string().min(1, 'اسمك الأخير مطلوب'),
  Email: z.string().min(1, 'البريد الالكتروني مطلوب').email('عنوان البريد الإلكتروني غير صالح'),
  PhoneNumber: z.string().min(1, 'رقم الهاتف الخاص بك مطلوب'),
  Type: z.string(),
  honeypot: z.string()
})
